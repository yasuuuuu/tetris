class Blocks {
  constructor(ctx, width, height, fieldCols, fieldRows, drawBackground) {
    this.ctx = ctx;
    this.x = 3;
    this.y = -1;
    this.setting = {
      width,
      height,
      cols: 4,
      rows: 4,
      fieldCols,
      fieldRows,
    };
    this.drawBackground = drawBackground;
    this.id = Math.floor(Math.random() * Blocks.blockPatterns().length);
    this.pattern = this.newBlocks();
    this.setKeyEvent();
  }

  newBlocks() {
    const pattern = [];
    for (let y = 0; y < this.setting.cols; y += 1) {
      pattern[y] = [];
      for (let x = 0; x < this.setting.rows; x += 1) {
        if (Blocks.blockPatterns()[this.id][y]) {
          pattern[y][x] = Blocks.blockPatterns()[this.id][y][x];
        } else {
          pattern[y][x] = 0;
        }
      }
    }
    return pattern;
  }

  move() {
    if (!this.canMove(0, 1)) { return; }
    this.y += 1;
  }

  draw() {
    for (let y = 0; y < this.setting.cols; y += 1) {
      for (let x = 0; x < this.setting.rows; x += 1) {
        this.drawBlock(this.x + x, this.y + y, this.pattern[y][x]);
      }
    }
  }

  drawBlock(x, y, block) {
    if (!block) { return; }
    this.ctx.fillRect(
      x * this.setting.width,
      y * this.setting.height,
      this.setting.width - 1,
      this.setting.height - 1,
    );
  }

  rotate() {
    const rotatePattern = [];
    for (let y = 0; y < this.setting.cols; y += 1) {
      rotatePattern[y] = [];
      for (let x = 0; x < this.setting.rows; x += 1) {
        rotatePattern[y][x] = this.pattern[x][-y + 3];
      }
    }
    this.pattern = rotatePattern;
  }

  setKeyEvent() {
    document.body.onkeydown = (e) => {
      switch (e.keyCode) {
        case 37:
          if (!this.canMove(-1, 0)) { break; }
          this.x -= 1;
          break;
        case 38:
          this.rotate();
          break;
        case 39:
          if (!this.canMove(1, 0)) { break; }
          this.x += 1;
          break;
        case 40:
          if (!this.canMove(0, 1)) { break; }
          this.y += 1;
          break;
      }
      this.drawBackground();
      this.draw();
    };
  }

  canMove(xDir, yDir) {
    const nextX = this.x + xDir;
    const nextY = this.y + yDir;
    for (let y = 0; y < this.setting.cols; y += 1) {
      for (let x = 0; x < this.setting.rows; x += 1) {
        if (this.pattern[y][x]) {
          if (nextX + x < 0
            || nextX + x >= this.setting.fieldCols
            || nextY + y >= this.setting.fieldRows) {
            return false;
          }
        }
      }
    }
    return true;
  }

  static blockPatterns() {
    const patterns = [
      [
        [1, 1, 1, 1],
        [0, 0, 0, 0],
      ],
      [
        [0, 1, 1, 0],
        [0, 1, 1, 0],
      ],
      [
        [0, 1, 1, 0],
        [1, 1, 0, 0],
      ],
      [
        [1, 1, 0, 0],
        [0, 1, 1, 0],
      ],
      [
        [1, 0, 0, 0],
        [1, 1, 1, 0],
      ],
      [
        [0, 0, 1, 0],
        [1, 1, 1, 0],
      ],
      [
        [0, 1, 0, 0],
        [1, 1, 1, 0],
      ],
    ];
    return patterns;
  }
}
