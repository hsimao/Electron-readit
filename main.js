// Modules
const { app, BrowserWindow, ipcMain } = require('electron');
const windowStateKeeper = require('electron-window-state');
const readItem = require('./reatItem');
const updater = require('./updater');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

// 監聽瀏覽器 ipc 相關事件
ipcMain.on('new-item', (e, itemUrl) => {
  // 調用 readItem 封裝方法, 取得網站 title, 螢幕截圖相關資訊後回傳到瀏覽器端
  readItem(itemUrl, item => {
    e.sender.send('new-item-success', item);
  });
});

// Create a new BrowserWindow when `app` is ready
function createWindow() {
  // 3 秒後檢查更新
  setTimeout(updater, 3000);

  // 預設視窗配置
  let state = windowStateKeeper({
    defaultWidth: 500,
    defaultHeight: 650
  });

  mainWindow = new BrowserWindow({
    x: state.x,
    y: state.y,
    width: state.width,
    height: state.height,
    minWidth: 350,
    maxWidth: 650,
    minHeight: 300,
    webPreferences: { nodeIntegration: true }
  });

  // Load index.html into the new BrowserWindow
  mainWindow.loadFile('renderer/main.html');

  // 保存上次視窗關閉位置與大小, 下次開啟時將使用原本設定
  state.manage(mainWindow);

  // Open DevTools - Remove for PRODUCTION!
  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools();
  }

  // Listen for window being closed
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// Electron `app` is ready
app.on('ready', createWindow);

// Quit when all windows are closed - (Not macOS - Darwin)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// When app icon is clicked and app is running, (macOS) recreate the BrowserWindow
app.on('activate', () => {
  if (mainWindow === null) createWindow();
});
