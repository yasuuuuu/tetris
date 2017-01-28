class CurrentBlocks extends Blocks {
  constructor(ctx, blockWidth, blockHeight, blockCols, blockRows,
    fieldCols, fieldRows, drawAll, fieldBlocksPattern) {
    super(ctx, blockWidth, blockHeight, blockCols, blockRows, drawAll);
    this.x = 3;
    this.y = -1;
    this.setting.fieldCols = fieldCols;
    this.setting.fieldRows = fieldRows;
    this.fieldBlocksPattern = fieldBlocksPattern;
    this.id = Math.floor(Math.random() * CurrentBlocks.blockPatterns().length);
    this.pattern = this.newPattern();
    this.setKeyEvent();
  }

  move() {
    if (!this.canMove(0, 1)) { return; }
    this.y += 1;
  }

  newPattern() {
    const pattern = [];
    for (let y = 0; y < this.setting.rows; y += 1) {
      pattern[y] = [];
      for (let x = 0; x < this.setting.cols; x += 1) {
        if (CurrentBlocks.blockPatterns()[this.id][y]) {
          pattern[y][x] = CurrentBlocks.blockPatterns()[this.id][y][x];
        } else {
          pattern[y][x] = 0;
        }
      }
    }
    return pattern;
  }

  rotate() {
    this.pattern = this.rotatePattern(this.pattern);
  }

  rotatePattern(pattern) {
    const rotatePattern = [];
    for (let y = 0; y < this.setting.rows; y += 1) {
      rotatePattern[y] = [];
      for (let x = 0; x < this.setting.cols; x += 1) {
        rotatePattern[y][x] = pattern[x][-y + 3];
      }
    }
    return rotatePattern;
  }

  setKeyEvent() {
    document.body.onkeydown = (e) => {
      switch (e.keyCode) {
        case 37:
          if (!this.canMove(-1, 0)) { break; }
          this.x -= 1;
          break;
        case 38:
          if (!this.canMove(0, 0, this.rotatePattern(this.pattern))) { break; }
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
        default:
          break;
      }
      this.drawAll();
    };
  }

  canMove(xDir, yDir, pattern) {
    const nextX = this.x + xDir;
    const nextY = this.y + yDir;
    const nextPattern = pattern || this.pattern;
    for (let y = 0; y < this.setting.rows; y += 1) {
      for (let x = 0; x < this.setting.cols; x += 1) {
        if (nextPattern[y][x]) {
          if (nextX + x < 0
            || nextX + x >= this.setting.fieldCols
            || nextY + y >= this.setting.fieldRows
            || !this.fieldBlocksPattern[nextY + y] // 新しくblocksを作る間用
            || this.fieldBlocksPattern[nextY + y][nextX + x]) {
            return false;
          }
        }
      }
    }
    return true;
  }

  static blockPatterns() {
    return [
      [
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
      [
        [0, 1, 1, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],

      ],
      [
        [0, 1, 1, 0],
        [1, 1, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
      [
        [1, 1, 0, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
      [
        [1, 0, 0, 0],
        [1, 1, 1, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
      [
        [0, 0, 1, 0],
        [1, 1, 1, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
      [
        [0, 1, 0, 0],
        [1, 1, 1, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
    ];
  }
}
