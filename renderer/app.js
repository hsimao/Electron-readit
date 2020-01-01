const { ipcRenderer } = require('electron');
const items = require('./items');

const showModal = document.getElementById('show-modal');
const closeModal = document.getElementById('close-modal');
const modal = document.getElementById('modal');
const addItem = document.getElementById('add-item');
const itemUrl = document.getElementById('url');

// 切換按鈕 disabled 狀態
const toggleModalButtons = () => {
  if (addItem.disabled === true) {
    addItem.disabled = false;
    addItem.style.opacity = 1;
    addItem.innerText = '新增';
    closeModal.style.display = 'inline';
  } else {
    addItem.disabled = true;
    addItem.style.opacity = 0.5;
    addItem.innerText = '新增中...';
    closeModal.style.display = 'none';
  }
};

showModal.addEventListener('click', () => {
  modal.style.display = 'flex';
  itemUrl.focus();
});

closeModal.addEventListener('click', () => {
  modal.style.display = 'none';
});

addItem.addEventListener('click', () => {
  if (itemUrl.value) {
    toggleModalButtons();
    // 將網址傳到主進程
    ipcRenderer.send('new-item', itemUrl.value);
  }
});

itemUrl.addEventListener('keyup', e => {
  if (e.key === 'Enter') addItem.click();
});

// 監聽主進程 ipc 相關事件
ipcRenderer.on('new-item-success', (e, newItem) => {
  console.log(newItem);

  // 將 item 新增到瀏覽器上
  items.addItem(newItem);

  toggleModalButtons();

  modal.style.display = 'none';
  itemUrl.value = '';
});
