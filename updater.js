const { autoUpdater } = require('electron-updater');

autoUpdater.logger = require('electron-log');
autoUpdater.logger.transports.file.level = 'info';

// 檢查當前應用是否需要更新
module.exports = () => {
  // 檢查版本, 從 github releases
  console.log('checking for updates');
  autoUpdater.checkForUpdates();
};
