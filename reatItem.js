const { BrowserWindow } = require('electron');

// Offscreen BrowserWindow
let offscreenWindow;

// 封裝透過網址取得網站 title, 螢幕截圖, 網址資訊
module.exports = (url, callback) => {
  // create offscreen window
  offscreenWindow = new BrowserWindow({
    width: 500,
    height: 500,
    show: false,
    webPreferences: {
      offscreen: true,
      nodeIntegration: false // 預設為 false
    }
  });

  // 載入網址
  offscreenWindow.loadURL(url);

  offscreenWindow.webContents.on('did-finish-load', e => {
    const title = offscreenWindow.getTitle();

    // 取得網頁截圖
    offscreenWindow.webContents.capturePage(image => {
      console.log('image', image);
      // 將圖片轉成 dataURL
      let screenshot = image.toDataURL();

      callback({ title, screenshot, url });

      // 清除 offscreenWindow
      offscreenWindow.close();
      offscreenWindow = null;
    });
  });
};
