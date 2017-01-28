class FieldBlocks extends Blocks {
  constructor(ctx, blockWidth, blockHeight, cols, rows, blockRows, drawAll, addScore) {
    super(ctx, blockWidth, blockHeight, cols, rows, drawAll);
    this.setting.blockRows = blockRows;
    this.pattern = this.newPattern();
    this.addScore = addScore;
  }

  move() {
    for (let y = this.setting.rows - 1; y >= 0; y -= 1) {
      if (this.pattern[y].every(elem => (elem === 1))) {
        this.clearRows(y);
        this.addScore();
      }
    }
  }

  clearRows(row) {
    for (let x = 0; x < this.setting.cols; x += 1) {
      this.pattern[row][x] = 0;
    }
    for (let y = row - 1; y >= 0; y -= 1) {
      this.pattern[y + 1] = this.pattern[y];
    }
    this.drawAll();
  }

  newPattern() {
    const pattern = [];
    for (let y = -this.setting.blockRows; y < this.setting.rows; y += 1) {
      pattern[y] = [];
      for (let x = 0; x < this.setting.cols; x += 1) {
        pattern[y][x] = 0;
      }
    }
    return pattern;
  }
}
