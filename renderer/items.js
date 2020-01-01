const items = document.getElementById('items');

exports.addItem = item => {
  const itemNode = document.createElement('div');

  itemNode.setAttribute('class', 'read-item');

  itemNode.innerHTML = `
  <img src="${item.screenshot}">
  <h2>${item.title}</h2>
  `;

  items.appendChild(itemNode);
};
