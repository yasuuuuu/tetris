class Blocks {
  constructor(ctx, width, height, drawBackground) {
    this.ctx = ctx;
    this.x = 3;
    this.y = -1;
    this.setting = {
      width,
      height,
      cols: 4,
      rows: 4,
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

  setKeyEvent() {
    document.body.onkeydown = (e) => {
      switch (e.keyCode) {
        case 37:
          this.x -= 1;
          break;
        case 38:
          this.rotate();
          break;
        case 39:
          this.x += 1;
          break;
        case 40:
          this.y += 1;
      }
      this.drawBackground();
      this.draw();
    };
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
