class FieldBlocks {
  constructor(ctx, blockWidth, blockHeight, cols, rows) {
    this.ctx = ctx;
    this.setting = {
      blockWidth,
      blockHeight,
      cols,
      rows,
    };
    this.pattern = [];
  }

  move() {
  }

  draw() {
    console.log('test');
    console.log(this.pattern);
    for (let y = 0; y < this.setting.cols; y += 1) {
      for (let x = 0; y < this.setting.rows; x += 1) {
        // console.log(this.pattern[y][x]);
        this.drawBlock(x, y, this.pattern[y][x]);
      }
    }
  }

  drawBlock(x, y, block) {
    if (!block) { return; }
    this.ctx.fillRect(
      x * this.setting.blockWidth,
      y * this.setting.blockHeight,
      this.setting.blockWidth - 1,
      this.setting.blockHeight - 1,
    );
  }
}
