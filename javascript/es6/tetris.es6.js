class Tetris {
  constructor(id) {
    this.gameObjects = [];
    this.setting = {
      width: 300,
      height: 600,
      cols: 10,
      rows: 20,
    };
    this.initCanvas(id);
    this.play();
  }

  initCanvas(selector) {
    this.canvas = document.getElementById(selector);
    this.canvas.width = this.setting.width;
    this.canvas.height = this.setting.height;
    this.ctx = this.canvas.getContext('2d');
    this.drawBackground();
  }

  play() {
    setInterval(() => {
      const gameObjectsFresh = [];
      this.handleGame();
      this.drawBackground();
      this.gameObjects.forEach((gameObject) => {
        gameObject.move();
        gameObject.draw();
        if (gameObject.removeMe === false) {
          gameObjectsFresh.push(gameObject);
        }
      });
      this.gameObjects = gameObjectsFresh;
    }, 500);
  }

  drawBackground() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = '#000';
    this.ctx.strokeRect(0, 0, this.setting.width, this.setting.height);
  }

  handleGame() {
    if (this.gameObjects.length) { return; }
    const blocks = new Blocks(
      this.setting.width / this.setting.cols,
      this.setting.height / this.setting.rows, this.ctx,
      this.drawBackground,
      this,
    );
    this.gameObjects.push(blocks);
  }
}
