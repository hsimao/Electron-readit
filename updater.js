const { dialog } = require('electron');
const { autoUpdater } = require('electron-updater');

autoUpdater.logger = require('electron-log');
autoUpdater.logger.transports.file.level = 'info';

// 關閉自動下載, 後續讓用戶自行選擇是否要下載
autoUpdater.autoDownload = false;

// 檢查當前應用是否需要更新
module.exports = () => {
  // 檢查版本, 從 github releases
  console.log('checking for updates');
  autoUpdater.checkForUpdates();

  // 監聽 update
  autoUpdater.on('update-available', () => {
    // 彈窗詢問用戶是否下載
    dialog.showMessageBox(
      {
        type: 'info',
        title: '更新程式',
        message: '當前有新的版本，是否要更新？',
        buttons: ['更新', '取消']
      },
      buttonIndex => {
        // 如果點選'更新', 就調用下載更新方法
        if (buttonIndex === 0) autoUpdater.downloadUpdate();
      }
    );
  });
};
