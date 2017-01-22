class Tetris {
  constructor(id) {
    this.initCanvas(id);
  }

  initCanvas(selector) {
    this.canvas = document.getElementById(selector);
    this.canvas.width = 300;
    this.canvas.height = 600;
    this.ctx = this.canvas.getContext('2d');
    this.ctx.fillStyle = '#000';
    this.ctx.strokeRect(0, 0, this.canvas.width, this.canvas.height);
  }
}
