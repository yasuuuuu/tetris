class Tetris {
  constructor(id) {
    this.setting = {
      width: 300,
      height: 600,
      cols: 10,
      rows: 20,
      blockCols: 4,
      blockRows: 4,
    };
    this.score = 0;
    this.initCanvas(id);
    this.initGameObjects();
  }

  initCanvas(selector) {
    this.canvas = document.getElementById(selector);
    this.canvas.width = this.setting.width;
    this.canvas.height = this.setting.height;
    this.ctx = this.canvas.getContext('2d');
    this.initInfo(this.canvas);
  }

  initGameObjects() {
    const fieldsBlocks = new FieldBlocks(
      this.ctx,
      this.setting.width / this.setting.cols,
      this.setting.height / this.setting.rows,
      this.setting.cols,
      this.setting.rows,
      this.setting.blockRows,
      this.drawAll.bind(this),
      this.addScore.bind(this),
    );
    this.gameObjects = {
      currentBlocks: this.newCurrentBlocks(fieldsBlocks.pattern),
      fieldBlocks: fieldsBlocks,
    };
  }

  initInfo(selector) {
    const info = document.createElement('div');
    info.setAttribute('id', 'info');
    info.innerHTML = `SCORE: ${this.score * 100}`;
    selector.parentNode.insertBefore(info, selector.nextSibling);
    this.info = document.getElementById('info');
  }

  newCurrentBlocks(fieldsBlocksPattern) {
    return new CurrentBlocks(
      this.ctx,
      this.setting.width / this.setting.cols,
      this.setting.height / this.setting.rows,
      this.setting.blockCols,
      this.setting.blockRows,
      this.setting.cols,
      this.setting.rows,
      this.drawAll.bind(this),
      fieldsBlocksPattern,
    );
  }

  play() {
    const timerId = setInterval(() => {
      this.drawBackground();
      Object.keys(this.gameObjects).forEach((key) => {
        this.gameObjects[key].move();
        this.gameObjects[key].draw();
        this.fixBlocks();
      });
      this.drawInfo();
      if (this.isGameOver()) {
        clearInterval(timerId);
        this.drawInfo('GAME OVER');
      }
    }, 500);
  }

  drawAll() {
    this.drawBackground();
    Object.keys(this.gameObjects).forEach((key) => {
      this.gameObjects[key].draw();
    });
  }

  drawBackground() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.save();
    const linGrad = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
    linGrad.addColorStop(0, '#41295a');
    linGrad.addColorStop(0.5, '#2F0743');
    linGrad.addColorStop(1, '#41295a');
    this.ctx.fillStyle = linGrad;
    this.ctx.fillRect(0, 0, this.setting.width, this.setting.height);
    this.ctx.restore();
  }

  fixBlocks() {
    if (this.gameObjects.currentBlocks.canMove(0, 1)) { return; }
    this.gameObjects.currentBlocks.pattern.forEach((cols, y) => {
      cols.forEach((val, x) => {
        if (val) {
          this.gameObjects.fieldBlocks
            .pattern[y + this.gameObjects.currentBlocks.y][x + this.gameObjects.currentBlocks.x]
            = this.gameObjects.currentBlocks.pattern[y][x];
        }
      });
    });
    this.gameObjects.currentBlocks = this.newCurrentBlocks(this.gameObjects.fieldBlocks.pattern);
    this.drawAll();
  }

  addScore() {
    this.score += 1;
  }

  drawInfo(message) {
    this.info.innerHTML = `SCORE: ${this.score * 100} ${message || ''}`;
  }

  isGameOver() {
    return this.gameObjects.fieldBlocks.pattern[0].some(elem => (elem === 1));
  }
}
