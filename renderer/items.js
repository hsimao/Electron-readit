const items = document.getElementById('items');

// 取得瀏覽器端 localStorage readit-items 內已經有的資料
exports.storage = JSON.parse(localStorage.getItem('readit-items')) || [];

// 重新儲存 localStorage readit-items
exports.save = () => {
  localStorage.setItem('readit-items', JSON.stringify(this.storage));
};

// 設置 selected class
exports.select = e => {
  document
    .getElementsByClassName('read-item selected')[0]
    .classList.remove('selected');

  e.currentTarget.classList.add('selected');
};

// 依據上、下鍵盤切換選擇狀態
exports.changeSelection = direction => {
  const currentItem = document.getElementsByClassName('read-item selected')[0];

  // 點擊鍵盤「上」且文章上方還有文章
  if (direction === 'ArrowUp' && currentItem.previousSibling) {
    currentItem.classList.remove('selected');
    currentItem.previousSibling.classList.add('selected');

    // 點擊鍵盤「下」且文章下方還有文章
  } else if (direction === 'ArrowDown' && currentItem.nextSibling) {
    currentItem.classList.remove('selected');
    currentItem.nextSibling.classList.add('selected');
  }
};

exports.addItem = (item, isNew = false) => {
  const itemNode = document.createElement('div');

  itemNode.setAttribute('class', 'read-item');

  itemNode.innerHTML = `
  <img src="${item.screenshot}">
  <h2>${item.title}</h2>
  `;

  items.appendChild(itemNode);

  // 新增監聽事件
  itemNode.addEventListener('click', this.select);

  // 預設第一個選取
  if (document.getElementsByClassName('read-item').length === 1) {
    itemNode.classList.add('selected');
  }

  // isNew 才需將 item 重新添加到 localStorage 內
  if (isNew) {
    this.storage.push(item);
    this.save();
  }
};

// 從瀏覽器 localStorage 取得資料後新增 item 到瀏覽器端
this.storage.forEach(item => {
  this.addItem(item);
});
