// 新增刪除按鈕 dom
let readitClose = document.createElement('div');
readitClose.innerText = 'Delete';

// button style
readitClose.style.position = 'fixed';
readitClose.style.zIndex = '9999';
readitClose.style.top = '15px';
readitClose.style.right = '15px';
readitClose.style.padding = '5px 10px';
readitClose.style.fontSize = '20px';
readitClose.style.fontWeight = 'bold';
readitClose.style.background = 'red';
readitClose.style.color = 'white';
readitClose.style.cursor = 'pointer';
readitClose.style.boxShadow = '2px 2px 2px rgba(0,0,0,0.2)';

// 監聽點擊事件, 發送訊息到主視窗(打開此頁視窗)
readitClose.addEventListener('click', () => {
  window.opener.postMessage({
    action: 'delete-reader-item',
    itemIndex: {{index}}
  }, '*');
});

document.getElementsByTagName('body')[0].appendChild(readitClose);
