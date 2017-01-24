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
    this.play();
  }

  initCanvas(selector) {
    this.canvas = document.getElementById(selector);
    this.canvas.width = this.setting.width;
    this.canvas.height = this.setting.height;
    this.ctx = this.canvas.getContext('2d');
  }

  initGameObjects() {
    this.gameObjects = {
      blocks: new Blocks(
        this.ctx,
        this.setting.width / this.setting.cols,
        this.setting.height / this.setting.rows,
        this.setting.cols,
        this.setting.rows,
        this.drawBackground.bind(this),
      ),
      field: new Field(
        this.ctx,
        this.setting.width / this.setting.cols,
        this.setting.height / this.setting.rows,
        this.cols,
        this.rows,
      ),
    };
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

  drawBackground() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = '#000';
    this.ctx.strokeRect(0, 0, this.setting.width, this.setting.height);
  }


  fixBlocks() {

  }


}
