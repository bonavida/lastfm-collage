const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

const dev = process.env.NODE_ENV === 'development';

// Keep a global reference of the window object
let win = null;

const installExtensions = async () => {
  const installer = require('electron-devtools-installer'); // eslint-disable-line import/no-extraneous-dependencies
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];

  return Promise.all(
    extensions.map(name => installer.default(installer[name], forceDownload))
  );
};

const createWindow = () => {
  win = new BrowserWindow({
    width: 900,
    height: 680,
    transparent: false,
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

  win.on('closed', () => {
    win = null;
  });
};

app.on('ready', async () => {
  if (dev) {
    await installExtensions();
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
