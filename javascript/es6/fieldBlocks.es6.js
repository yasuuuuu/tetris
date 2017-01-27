class FieldBlocks {
  constructor(ctx, blockWidth, blockHeight, cols, rows) {
    this.ctx = ctx;
    this.setting = {
      blockWidth,
      blockHeight,
      cols,
      rows,
    };
    this.pattern = this.newPattern();
  }

  move() {
  }

  draw() {
    for (let y = 0; y < this.setting.rows; y += 1) {
      for (let x = 0; x < this.setting.cols; x += 1) {
        if (this.pattern[y]) {
          this.drawBlock(x, y, this.pattern[y][x]);
        }
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

  newPattern() {
    const pattern = [];
    for (let y = 0; y < this.setting.rows; y += 1) {
      pattern[y] = [];
      for(let x = 0; x < this.setting.cols; x += 1) {
        pattern[y][x] = 0;
      }
    }
    return pattern;
  }
}
