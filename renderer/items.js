const items = document.getElementById('items');

// 取得瀏覽器端 localStorage readit-items 內已經有的資料
exports.storage = JSON.parse(localStorage.getItem('readit-items')) || [];

// 重新儲存 localStorage readit-items
exports.save = () => {
  localStorage.setItem('readit-items', JSON.stringify(this.storage));
};

exports.addItem = (item, isNew = false) => {
  const itemNode = document.createElement('div');

  itemNode.setAttribute('class', 'read-item');

  itemNode.innerHTML = `
  <img src="${item.screenshot}">
  <h2>${item.title}</h2>
  `;

  items.appendChild(itemNode);

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
