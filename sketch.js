let textContent = "🐾🐰💗🦊🐾";
let slider;
let button;
let yOffsets = [];
let dropdown;
let iframe;

function setup() {  //這是一個設定函數，只會執行一次
  // 產生一個畫布，充滿整個視窗，背景顏色為d8e2dc
  createCanvas(windowWidth, windowHeight);
  background('#d8e2dc');

  // 創建輸入框
  let input = createInput(textContent);
  input.position(10, 10);
  input.size(200, 50);  // 將輸入框的寬度設置為200
  input.input(updateTextContent);
  input.style('font-size', '24px');  // 將輸入框的文字大小設置為24px

  // 創建滑桿
  slider = createSlider(12, 40, 24);
  slider.position(350, 30);
  slider.size(100);

  // 創建按鈕
  button = createButton('跳動');
  button.position(470, 15);
  button.style('background-color', '#ffcad4');  // 設置按鈕背景顏色
  button.style('border-radius', '30px');  // 設置按鈕圓弧半徑
  button.style('padding', '10px 15px');  // 設置按鈕內邊距
  button.style('font-size', '20px');  // 設置按鈕文字大小
  button.mousePressed(toggleJumping);

  // 創建下拉選單
  dropdown = createSelect();
  dropdown.position(575, 30);
  dropdown.size(200);
  dropdown.style('font-size', '20px'); 
  dropdown.option('淡江大學');
  dropdown.option('教育科技學系');
  dropdown.option('我的筆記');
  dropdown.changed(updateIframe);

  // 創建 iframe
  iframe = createElement('iframe');
  iframe.position(100, 100);
  iframe.size(windowWidth - 200, windowHeight - 200);
  iframe.attribute('src', 'https://www.tku.edu.tw/');

  // 初始化每行的 y 偏移量
  for (let y = 100; y < height; y += 50) {
    yOffsets.push(0);
  }
}

let jumping = false;

function draw() {  //這是一個繪圖函數，會一直執行
  background('#d8e2dc');  //設定背景顏色為d8e2dc
  fill(0);

  // 設置 "文字大小" 的字體大小
  textSize(24);
  text('文字大小', 250, 30);

  // 獲取滑桿的值並設置文字大小
  let textSizeValue = slider.value();
  textSize(textSizeValue);
  textAlign(LEFT, TOP);
  fill(0);
  stroke(0);
  strokeWeight(1);

  let contentWidth = textWidth(textContent + " ");  // 加入空格的寬度
  let startX = 0;  // 從螢幕最左邊開始

  for (let i = 0, y = 100; y < height; y += 50, i++) {  // 每行文字的高度為50
    if (jumping) {
      yOffsets[i] = sin(frameCount * 0.1 + i) * 5;  // 設置每行的 y 偏移量
    }
    for (let x = startX; x < width; x += contentWidth + 10) {  // 字串與字串間距為10
      text(textContent, x, y + yOffsets[i]);
    }
  }
}

function updateTextContent() {
  textContent = this.value();
}

function toggleJumping() {
  jumping = !jumping;
}

function updateIframe() {
  let selected = dropdown.value();
  if (selected === '淡江大學') {
    iframe.attribute('src', 'https://www.tku.edu.tw/');
  } else if (selected === '教育科技學系') {
    iframe.attribute('src', 'https://www.et.tku.edu.tw/');
  } else if (selected === '我的筆記') {
    iframe.attribute('src', 'https://hackmd.io/@Vivian689/0314');
  }
}
