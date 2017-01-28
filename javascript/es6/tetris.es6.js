class Tetris {
  constructor(id) {
    this.setting = {
      width: 300,
      height: 600,
      cols: 10,
      rows: 20,
    };
    this.initCanvas(id);
    this.initGameObjects();
  }

  initCanvas(selector) {
    this.canvas = document.getElementById(selector);
    this.canvas.width = this.setting.width;
    this.canvas.height = this.setting.height;
    this.ctx = this.canvas.getContext('2d');
  }

  initGameObjects() {
    const fieldsBlocks = new FieldBlocks(
      this.ctx,
      this.setting.width / this.setting.cols,
      this.setting.height / this.setting.rows,
      this.setting.cols,
      this.setting.rows,
      this.drawAll.bind(this),
    );
    this.gameObjects = {
      currentBlocks: this.newCurrentBlocks(fieldsBlocks.pattern),
      fieldBlocks: fieldsBlocks,
    };
  }

  newCurrentBlocks(fieldsBlocksPattern) {
    return new CurrentBlocks(
      this.ctx,
      this.setting.width / this.setting.cols,
      this.setting.height / this.setting.rows,
      this.setting.cols,
      this.setting.rows,
      this.drawAll.bind(this),
      fieldsBlocksPattern,
    );
  }

  play() {
    setInterval(() => {
      this.drawBackground();
      Object.keys(this.gameObjects).forEach((key) => {
        this.gameObjects[key].move();
        this.gameObjects[key].draw();
        this.fixBlocks();
      });
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
    this.ctx.fillStyle = '#000';
    this.ctx.strokeRect(0, 0, this.setting.width, this.setting.height);
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
  }
}
