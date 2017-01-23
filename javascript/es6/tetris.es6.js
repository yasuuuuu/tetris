class Tetris {
  constructor(id) {
    this.gameObjects = [];
    this.initCanvas(id);
    setInterval(this.play(), 30);
  }

  initCanvas(selector) {
    this.canvas = document.getElementById(selector);
    this.canvas.width = 300;
    this.canvas.height = 600;
    this.ctx = this.canvas.getContext('2d');
    this.drawBackground();
  }

  play() {
    const gameObjectsFresh = [];

    this.handleGame();
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawBackground();
    this.gameObjects.forEach((gameObject) => {
      gameObject.move();
      gameObject.draw();
      if (gameObject.removeMe === false) {
        gameObjectsFresh.push(gameObject);
      }
    });
    this.gameObjects = gameObjectsFresh;
  }

  drawBackground() {
    this.ctx.fillStyle = '#000';
    this.ctx.strokeRect(0, 0, this.canvas.width, this.canvas.height);
  }

  handleGame() {
    if (this.gameObjects.length) { return; }
    const blocks = new Blocks();
    this.gameObjects.push(blocks);
  }
}
