let input, slider, button, dropdown;
let isShaking = false;
let iframe; // 用於顯示連結內容的 iframe

function setup() {
  createCanvas(windowWidth, windowHeight);
  input = createInput();
  input.position(10, 10);
  input.value("ET");
  
  slider = createSlider(28, 50, 32); // 創建滑桿，範圍從28到50，初始值為32
  slider.position(input.x + input.width + 10, 10); // 將滑桿放在文字框的右側
  
  button = createButton('Toggle Shake');
  button.position(slider.x + slider.width + 10, 10);
  button.mousePressed(toggleShake);
  
  dropdown = createSelect();
  dropdown.position(button.x + button.width + 10, 10);
  dropdown.option('選項');
  dropdown.option('作品集ＴＫＵ');
  dropdown.option('作品集');
  dropdown.option('測驗卷');
  dropdown.option('自我介紹'); // 新增自我介紹選項
  dropdown.changed(goToLink);
  
  textFont('Arial'); // 設置字體為 Arial

  // 創建 iframe 並設置樣式
  iframe = createElement('iframe');
  iframe.style('position', 'absolute');
  iframe.style('width', '70%');
  iframe.style('height', '70%');
  iframe.style('top', '15%');
  iframe.style('left', '15%');
  iframe.style('border', 'none');
  iframe.style('display', 'none'); // 預設隱藏
}

function draw() {
  background('#a3b18a'); // 設置背景顏色為 a3b18a
  let txt = input.value();
  let repeatedTxt = txt.split('').join(' ');
  textAlign(CENTER, CENTER);
  textSize(slider.value()); // 根據滑桿的值設置文字大小
  textStyle(BOLD); // 設置文字為粗體
  fill(255); // 設置文字顏色為白色
  
  let lineHeight = 40; // 每行之間的間隔
  let y = 100; // 從y座標100開始

  for (; y < height; y += lineHeight) { // 顯示直到畫布底部
    for (let x = 0; x < width; x += textWidth(repeatedTxt) + 20) { // 顯示直到畫布右邊
      if (isShaking) {
        let shakeX = x + random(-5, 5);
        let shakeY = y + random(-5, 5);
        text(repeatedTxt, shakeX, shakeY);
      } else {
        text(repeatedTxt, x, y);
      }
    }
  }
}

function toggleShake() {
  isShaking = !isShaking;
}

function goToLink() {
  let selected = dropdown.value();
  if (selected === '作品集ＴＫＵ') {
    showIframe('https://mj1119-c.github.io/seaweed/');
  } else if (selected === '作品集') {
    showIframe('https://www.et.tku.edu.tw');
  } else if (selected === '測驗卷') {
    showIframe('https://mj1119-c.github.io/20250310/');
  } else if (selected === '自我介紹') {
    showIframe('https://mj1119-c.github.io/intro'); // 假設自我介紹的連結
  }
}

function showIframe(url) {
  iframe.attribute('src', url); // 設置 iframe 的來源 URL
  iframe.style('display', 'block'); // 顯示 iframe
}

function hideIframe() {
  iframe.style('display', 'none'); // 隱藏 iframe
}

// 點擊畫布時隱藏 iframe
function mousePressed() {
  hideIframe();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}