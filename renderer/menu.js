const { remote, shell } = require('electron');

const template = [
  {
    label: '文章',
    submenu: [
      {
        label: '新增',
        accelerator: 'Cmd+A',
        click: window.newItem
      },
      {
        label: '打開',
        accelerator: 'Cmd+O',
        click: window.openItem
      },
      {
        label: '刪除',
        accelerator: 'Cmd+Backspace',
        click: window.deleteItem
      },
      {
        label: '在瀏覽器中打開',
        accelerator: 'Cmd+Shift+O',
        click: window.openItemNative
      },
      {
        label: '搜尋',
        accelerator: 'Cmd+S',
        click: window.searchItems
      }
    ]
  },
  {
    label: '編輯',
    role: 'editMenu'
  },
  {
    label: '視窗',
    role: 'windowMenu'
  },
  {
    role: 'help',
    submenu: [
      {
        label: '原始碼',
        click: () => {
          shell.openExternal('https://github.com/hsimao/Electron-readit');
        }
      }
    ]
  }
];

// 針對 mac os 系統特別設置
// darwin => apple Mac OS 系統名稱
if (process.platform === 'darwin') {
  template.unshift({
    label: remote.app.getName(),
    submenu: [
      { role: 'about' },
      { type: 'separator' },
      { role: 'services' },
      { type: 'separator' },
      { role: 'hide' },
      { role: 'hideothers' },
      { role: 'unhide' },
      { type: 'separator' },
      { role: 'quit' }
    ]
  });
}

const menu = remote.Menu.buildFromTemplate(template);

remote.Menu.setApplicationMenu(menu);
