const electron = require('electron');
const path = require('path');
const url = require('url');

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({ width: 900, height: 680, icon: 'favicon.ico' });
    
    mainWindow.maximize();
    mainWindow.removeMenu();

    const startUrl = app.isPackaged
        ? url.format({
            pathname: path.join(__dirname, "../build/index.html"),
            protocol: 'file:',
            slashes: true
        })
        : "http://localhost:3000"; // FIXME env

    mainWindow.loadURL(startUrl);

    mainWindow.on('closed', () => mainWindow = null);
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});
