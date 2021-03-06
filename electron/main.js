const { app, BrowserWindow, shell, nativeImage } = require('electron');
const path = require('path');
const url = require('url');

const LASTFM_AUTH_URL = 'https://www.last.fm/api/auth';
const LASTFM_LOGIN_URL = 'https://secure.last.fm/login';
const dev = process.env.NODE_ENV === 'development';

// Keep a global reference of the window object
let win = null;

const installExtensions = () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];

  return Promise.all(
    extensions.map(name => installer.default(installer[name], forceDownload))
  );
};

const isSafeishURL = externalUrl =>
  externalUrl.startsWith('http:') || externalUrl.startsWith('https:');

const isAuthenticationUrl = externalUrl =>
  externalUrl.startsWith(LASTFM_AUTH_URL);

const isLoginUrl = externalUrl => externalUrl.startsWith(LASTFM_LOGIN_URL);

const handleOpenUrl = (event, externalUrl) => {
  if (
    isSafeishURL(externalUrl) &&
    !isAuthenticationUrl(externalUrl) &&
    !isLoginUrl(externalUrl)
  ) {
    event.preventDefault();
    shell.openExternal(externalUrl);
  }
};

const createWindow = () => {
  win = new BrowserWindow({
    width: 900,
    height: 680,
    transparent: false,
    icon: nativeImage.createFromPath(
      path.join(__dirname, 'build', 'icons', '32x32.png')
    ),
    webPreferences: {
      devTools: dev,
      nodeIntegration: false,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  const startUrl =
    process.env.ELECTRON_START_URL ||
    url.format({
      pathname: path.join(__dirname, '..', 'build', 'index.html'),
      protocol: 'file:',
      slashes: true,
    });

  win.loadURL(startUrl);

  win.webContents.on('will-navigate', handleOpenUrl);
  win.webContents.on('new-window', handleOpenUrl);

  win.on('closed', () => {
    win = null;
  });
};

app.on('ready', async () => {
  if (dev) {
    try {
      await installExtensions();
    } catch (e) {
      console.log(e);
    }
  }
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});
