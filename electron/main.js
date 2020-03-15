const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

const dev = process.env.NODE_ENV === 'development';

// Keep a global reference of the window object
let win = null;

const createWindow = () => {
  win = new BrowserWindow({
    width: 900,
    height: 680,
    transparent: false,
    webPreferences: {
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

  if (dev) {
    win.webContents.once('dom-ready', () => {
      win.webContents.openDevTools();
    });
  } else {
    win.webContents.on('devtools-opened', () => {
      win.webContents.closeDevTools();
    });
  }

  win.on('closed', () => {
    win = null;
  });
};

app.on('ready', createWindow);

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
