class Blocks {
  constructor(ctx, blockWidth, blockHeight, cols, rows, drawAll) {
    this.ctx = ctx;
    this.x = 0;
    this.y = 0;
    this.setting = {
      blockWidth,
      blockHeight,
      cols,
      rows,
    };
    this.pattern = [];
    this.drawAll = drawAll;
  }

  move() {
  }

  draw() {
    for (let y = 0; y < this.setting.rows; y += 1) {
      for (let x = 0; x < this.setting.cols; x += 1) {
        this.drawBlock(this.x + x, this.y + y, this.pattern[y][x]);
      }
    }
  }

  drawBlock(x, y, block) {
    if (!block) { return; }
    this.ctx.save();
    this.ctx.fillStyle = '#fff';
    this.ctx.fillRect(
      x * this.setting.blockWidth,
      y * this.setting.blockHeight,
      this.setting.blockWidth - 1,
      this.setting.blockHeight - 1,
    );
    this.ctx.restore();
  }

  hasBlock(x, y) {
    return (this.pattern[y][x] === 1);
  }
}
