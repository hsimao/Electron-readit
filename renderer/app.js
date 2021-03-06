const { ipcRenderer } = require('electron');
const items = require('./items');

// dom
const showModal = document.getElementById('show-modal');
const closeModal = document.getElementById('close-modal');
const modal = document.getElementById('modal');
const addItem = document.getElementById('add-item');
const itemUrl = document.getElementById('url');
const search = document.getElementById('search');

// 將需要配置到 menu 使用的功能儲存到 window 上以便調用
// 打開新增文章 modal
window.newItem = () => showModal.click();

// 打開文章
window.openItem = items.open;

// 從原生瀏覽器打開文章
window.openItemNative = items.openNative;

// 刪除文章
window.deleteItem = () => {
  const selectedItem = items.getSelectedItem().index;
  items.delete(selectedItem);
};

// 搜尋輸入框焦點狀態
window.searchItems = () => {
  search.focus();
};

// 過濾文章 by search
search.addEventListener('keyup', e => {
  Array.from(document.getElementsByClassName('read-item')).forEach(item => {
    const itemTitle = item.innerText.toLowerCase();
    const searchValue = search.value.toLowerCase();
    const hasMatch = itemTitle.includes(searchValue);

    item.style.display = hasMatch ? 'flex' : 'none';
  });
});

// 使用鍵盤上下切換文章選擇狀態
document.addEventListener('keydown', e => {
  if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
    items.changeSelection(e.key);
  }
});

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
  items.addItem(newItem, true);

  toggleModalButtons();

  modal.style.display = 'none';
  itemUrl.value = '';
});
