let seaweeds = [];
let angle = 0;
let backgroundLayer;

function setup() {
  // 灰色背景圖層
  backgroundLayer = createGraphics(windowWidth, windowHeight);
  backgroundLayer.background(220); // 灰色背景

  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < 150; i++) { // 將水草數量增加到 150
    seaweeds.push({
      x: random(width), // 隨機分布於畫布寬度
      maxHeight: height - (height / 5 + random(-30, 30)), // 隨機高度為螢幕的 1/5 高，隨機範圍為 ±30
      thickness: random(15, 20), // 隨機粗細
      bendFactor: random(0.01, 0.025), // 隨機彎曲程度
      color: color(random(50, 150), random(100, 200), random(50, 150)) // 隨機顏色
    });
  }

  // 新增 iframe
  let iframe = createElement('iframe');
  iframe.attribute('src', 'https://www.et.tku.edu.tw/');
  iframe.style('position', 'absolute');
  iframe.style('width', '80%');
  iframe.style('height', '80%');
  iframe.style('top', '10%');
  iframe.style('left', '10%');
  iframe.style('border', 'none');
  iframe.style('z-index', '1'); // 設定 iframe 的 z-index 為 1
  iframe.style('pointer-events', 'auto'); // 允許 iframe 接收操作事件

  // 調整 canvas 的 z-index 並禁用其 pointer-events
  let canvas = document.querySelector('canvas');
  canvas.style.position = 'absolute';
  canvas.style.zIndex = '2'; // 設定 canvas 的 z-index 為 2，確保水草在 iframe 之上
  canvas.style.background = 'transparent'; // 設定背景為透明
  canvas.style.pointerEvents = 'none'; // 禁用 canvas 的 pointer-events，避免阻擋 iframe 操作
}

function draw() {
  clear(); // 清除畫布，保留透明背景
  blendMode(BLEND); // 設定混合模式為 BLEND
  drawSeaweeds(); // 水草繪製在最上面
}

function drawSeaweeds() {
  for (let seaweed of seaweeds) {
    stroke(seaweed.color);
    strokeWeight(seaweed.thickness);
    seaweed.color.setAlpha(150); // 設定透明度為 150
    noFill();

    beginShape();
    let segmentLength = 3; // 減小段距，增加搖晃節點數量
    for (let y = height; y > seaweed.maxHeight; y -= segmentLength) {
      let offset = map(y, height, seaweed.maxHeight, 0, 20); // 縮小左右搖晃幅度
      let x = seaweed.x + sin(angle + y * seaweed.bendFactor) * offset; // 使用個別的彎曲程度
      vertex(x, y);
    }
    endShape();
  }

  angle += 0.05; // 控制搖動速度
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  backgroundLayer.resizeCanvas(windowWidth, windowHeight);
  backgroundLayer.background(220); // 更新灰色背景

  seaweeds = [];
  for (let i = 0; i < 150; i++) { // 將水草數量增加到 150
    seaweeds.push({
      x: random(width), // 隨機分布於畫布寬度
      maxHeight: height - (height / 5 + random(-30, 30)), // 隨機高度為螢幕的 1/5 高，隨機範圍為 ±30
      thickness: random(5, 15), // 隨機粗細
      bendFactor: random(0.01, 0.05), // 隨機彎曲程度
      color: color(random(50, 150), random(100, 200), random(50, 150)) // 隨機顏色
    });
  }
}