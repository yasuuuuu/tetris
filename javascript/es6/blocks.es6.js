class Blocks {
  constructor() {
    this.BLOCKS = Blocks.blockPatterns();
    this.setting = {
      width: 4,
      height: 4,
    };
    this.pattern = this.newBlocks();
  }

  newBlocks() {
    const id = Math.floor(Math.random() * this.BLOCKS.length);
    const blocks = [];
    for (let y = 0; y < this.setting.height; y += 1) {
      blocks[y] = [];
      for (let x = 0; x < this.setting.width; x += 1) {
        if (this.BLOCKS[id][y]) {
          blocks[y][x] = this.BLOCKS[id][y][x];
        } else {
          blocks[y][x] = 0;
        }
      }
    }
    return blocks;
  }

  move() {

  }

  draw() {

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
