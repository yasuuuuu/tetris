'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Blocks = function () {
  function Blocks(ctx, width, height, fieldCols, fieldRows, drawBackground) {
    _classCallCheck(this, Blocks);

    this.ctx = ctx;
    this.x = 3;
    this.y = -1;
    this.setting = {
      width: width,
      height: height,
      cols: 4,
      rows: 4,
      fieldCols: fieldCols,
      fieldRows: fieldRows
    };
    this.drawBackground = drawBackground;
    this.id = Math.floor(Math.random() * Blocks.blockPatterns().length);
    this.pattern = this.newBlocks();
    this.setKeyEvent();
  }

  _createClass(Blocks, [{
    key: 'move',
    value: function move() {
      if (!this.canMove(0, 1)) {
        return;
      }
      this.y += 1;
    }
  }, {
    key: 'draw',
    value: function draw() {
      for (var y = 0; y < this.setting.cols; y += 1) {
        for (var x = 0; x < this.setting.rows; x += 1) {
          this.drawBlock(this.x + x, this.y + y, this.pattern[y][x]);
        }
      }
    }
  }, {
    key: 'newBlocks',
    value: function newBlocks() {
      var pattern = [];
      for (var y = 0; y < this.setting.cols; y += 1) {
        pattern[y] = [];
        for (var x = 0; x < this.setting.rows; x += 1) {
          if (Blocks.blockPatterns()[this.id][y]) {
            pattern[y][x] = Blocks.blockPatterns()[this.id][y][x];
          } else {
            pattern[y][x] = 0;
          }
        }
      }
      return pattern;
    }
  }, {
    key: 'drawBlock',
    value: function drawBlock(x, y, block) {
      if (!block) {
        return;
      }
      this.ctx.fillRect(x * this.setting.width, y * this.setting.height, this.setting.width - 1, this.setting.height - 1);
    }
  }, {
    key: 'rotate',
    value: function rotate() {
      var rotatePattern = [];
      for (var y = 0; y < this.setting.cols; y += 1) {
        rotatePattern[y] = [];
        for (var x = 0; x < this.setting.rows; x += 1) {
          rotatePattern[y][x] = this.pattern[x][-y + 3];
        }
      }
      this.pattern = rotatePattern;
    }
  }, {
    key: 'setKeyEvent',
    value: function setKeyEvent() {
      var _this = this;

      document.body.onkeydown = function (e) {
        switch (e.keyCode) {
          case 37:
            if (!_this.canMove(-1, 0)) {
              break;
            }
            _this.x -= 1;
            break;
          case 38:
            _this.rotate();
            break;
          case 39:
            if (!_this.canMove(1, 0)) {
              break;
            }
            _this.x += 1;
            break;
          case 40:
            if (!_this.canMove(0, 1)) {
              break;
            }
            _this.y += 1;
            break;
          default:
            break;
        }
        _this.drawBackground();
        _this.draw();
      };
    }
  }, {
    key: 'canMove',
    value: function canMove(xDir, yDir) {
      var nextX = this.x + xDir;
      var nextY = this.y + yDir;
      for (var y = 0; y < this.setting.cols; y += 1) {
        for (var x = 0; x < this.setting.rows; x += 1) {
          if (this.pattern[y][x]) {
            if (nextX + x < 0 || nextX + x >= this.setting.fieldCols || nextY + y >= this.setting.fieldRows) {
              return false;
            }
          }
        }
      }
      return true;
    }
  }], [{
    key: 'blockPatterns',
    value: function blockPatterns() {
      return [[[1, 1, 1, 1], [0, 0, 0, 0]], [[0, 1, 1, 0], [0, 1, 1, 0]], [[0, 1, 1, 0], [1, 1, 0, 0]], [[1, 1, 0, 0], [0, 1, 1, 0]], [[1, 0, 0, 0], [1, 1, 1, 0]], [[0, 0, 1, 0], [1, 1, 1, 0]], [[0, 1, 0, 0], [1, 1, 1, 0]]];
    }
  }]);

  return Blocks;
}();

var FieldBlocks = function () {
  function FieldBlocks(ctx, blockWidth, blockHeight, cols, rows) {
    _classCallCheck(this, FieldBlocks);

    this.ctx = ctx;
    this.setting = {
      blockWidth: blockWidth,
      blockHeight: blockHeight,
      cols: cols,
      rows: rows
    };
    this.pattern = [];
  }

  _createClass(FieldBlocks, [{
    key: 'move',
    value: function move() {}
  }, {
    key: 'draw',
    value: function draw() {
      console.log('test');
      console.log(this.pattern);
      for (var y = 0; y < this.setting.cols; y += 1) {
        for (var x = 0; y < this.setting.rows; x += 1) {
          // console.log(this.pattern[y][x]);
          this.drawBlock(x, y, this.pattern[y][x]);
        }
      }
    }
  }, {
    key: 'drawBlock',
    value: function drawBlock(x, y, block) {
      if (!block) {
        return;
      }
      this.ctx.fillRect(x * this.setting.blockWidth, y * this.setting.blockHeight, this.setting.blockWidth - 1, this.setting.blockHeight - 1);
    }
  }]);

  return FieldBlocks;
}();

window.onload = function () {
  var tetris = new Tetris('field');
  tetris.play();
};

var Tetris = function () {
  function Tetris(id) {
    _classCallCheck(this, Tetris);

    this.setting = {
      width: 300,
      height: 600,
      cols: 10,
      rows: 20
    };
    this.initCanvas(id);
    this.initGameObjects();
  }

  _createClass(Tetris, [{
    key: 'initCanvas',
    value: function initCanvas(selector) {
      this.canvas = document.getElementById(selector);
      this.canvas.width = this.setting.width;
      this.canvas.height = this.setting.height;
      this.ctx = this.canvas.getContext('2d');
    }
  }, {
    key: 'initGameObjects',
    value: function initGameObjects() {
      this.gameObjects = {
        blocks: this.newBlocks(),
        fieldBlocks: new FieldBlocks(this.ctx, this.setting.width / this.setting.cols, this.setting.height / this.setting.rows, this.cols, this.rows)
      };
    }
  }, {
    key: 'newBlocks',
    value: function newBlocks() {
      return new Blocks(this.ctx, this.setting.width / this.setting.cols, this.setting.height / this.setting.rows, this.setting.cols, this.setting.rows, this.drawBackground.bind(this));
    }
  }, {
    key: 'play',
    value: function play() {
      var _this2 = this;

      setInterval(function () {
        _this2.drawBackground();
        Object.keys(_this2.gameObjects).forEach(function (key) {
          _this2.gameObjects[key].move();
          _this2.gameObjects[key].draw();
          _this2.fixBlocks();
        });
      }, 500);
    }
  }, {
    key: 'drawBackground',
    value: function drawBackground() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.fillStyle = '#000';
      this.ctx.strokeRect(0, 0, this.setting.width, this.setting.height);
    }
  }, {
    key: 'fixBlocks',
    value: function fixBlocks() {
      var _this3 = this;

      if (this.gameObjects.blocks.canMove(0, 1)) {
        return;
      }
      this.gameObjects.blocks.pattern.forEach(function (cols, y) {
        // console.log('cols: ' + cols);
        // console.log('y: ' + y);
        // console.log('this.y: ' + this.gameObjects.blocks.y);
        _this3.gameObjects.fieldBlocks.pattern[y + _this3.gameObjects.blocks.y] = _this3.gameObjects.fieldBlocks.pattern[y + _this3.gameObjects.blocks.y] || [];
        cols.forEach(function (val, x) {
          if (val) {
            _this3.gameObjects.fieldBlocks.pattern[y + _this3.gameObjects.blocks.y][x + _this3.gameObjects.blocks.x] = _this3.gameObjects.blocks.pattern[y][x];
          }
        });
      });
      this.gameObjects.blocks = this.newBlocks();
    }
  }]);

  return Tetris;
}();