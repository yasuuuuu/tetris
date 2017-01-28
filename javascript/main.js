'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Blocks = function () {
  function Blocks(ctx, blockWidth, blockHeight, cols, rows, drawAll) {
    _classCallCheck(this, Blocks);

    this.ctx = ctx;
    this.x = 0;
    this.y = 0;
    this.setting = {
      blockWidth: blockWidth,
      blockHeight: blockHeight,
      cols: cols,
      rows: rows
    };
    this.pattern = [];
    this.drawAll = drawAll;
  }

  _createClass(Blocks, [{
    key: 'move',
    value: function move() {}
  }, {
    key: 'draw',
    value: function draw() {
      for (var y = 0; y < this.setting.rows; y += 1) {
        for (var x = 0; x < this.setting.cols; x += 1) {
          this.drawBlock(this.x + x, this.y + y, this.pattern[y][x]);
        }
      }
    }
  }, {
    key: 'drawBlock',
    value: function drawBlock(x, y, block) {
      if (!block) {
        return;
      }
      this.ctx.save();
      this.ctx.fillStyle = '#fff';
      this.ctx.fillRect(x * this.setting.blockWidth, y * this.setting.blockHeight, this.setting.blockWidth - 1, this.setting.blockHeight - 1);
      this.ctx.restore();
    }
  }, {
    key: 'hasBlock',
    value: function hasBlock(x, y) {
      return this.pattern[y][x] === 1;
    }
  }]);

  return Blocks;
}();

var CurrentBlocks = function (_Blocks) {
  _inherits(CurrentBlocks, _Blocks);

  function CurrentBlocks(ctx, blockWidth, blockHeight, blockCols, blockRows, fieldCols, fieldRows, drawAll, fieldBlocksPattern) {
    _classCallCheck(this, CurrentBlocks);

    var _this = _possibleConstructorReturn(this, (CurrentBlocks.__proto__ || Object.getPrototypeOf(CurrentBlocks)).call(this, ctx, blockWidth, blockHeight, blockCols, blockRows, drawAll));

    _this.x = 3;
    _this.y = -1;
    _this.setting.fieldCols = fieldCols;
    _this.setting.fieldRows = fieldRows;
    _this.fieldBlocksPattern = fieldBlocksPattern;
    _this.id = Math.floor(Math.random() * CurrentBlocks.blockPatterns().length);
    _this.pattern = _this.newPattern();
    _this.setKeyEvent();
    return _this;
  }

  _createClass(CurrentBlocks, [{
    key: 'move',
    value: function move() {
      if (!this.canMove(0, 1)) {
        return;
      }
      this.y += 1;
    }
  }, {
    key: 'newPattern',
    value: function newPattern() {
      var pattern = [];
      for (var y = 0; y < this.setting.rows; y += 1) {
        pattern[y] = [];
        for (var x = 0; x < this.setting.cols; x += 1) {
          if (CurrentBlocks.blockPatterns()[this.id][y]) {
            pattern[y][x] = CurrentBlocks.blockPatterns()[this.id][y][x];
          } else {
            pattern[y][x] = 0;
          }
        }
      }
      return pattern;
    }
  }, {
    key: 'rotate',
    value: function rotate() {
      this.pattern = this.rotatePattern(this.pattern);
    }
  }, {
    key: 'rotatePattern',
    value: function rotatePattern(pattern) {
      var rotatePattern = [];
      for (var y = 0; y < this.setting.rows; y += 1) {
        rotatePattern[y] = [];
        for (var x = 0; x < this.setting.cols; x += 1) {
          rotatePattern[y][x] = pattern[x][-y + 3];
        }
      }
      return rotatePattern;
    }
  }, {
    key: 'setKeyEvent',
    value: function setKeyEvent() {
      var _this2 = this;

      document.body.onkeydown = function (e) {
        switch (e.keyCode) {
          case 37:
            if (!_this2.canMove(-1, 0)) {
              break;
            }
            _this2.x -= 1;
            break;
          case 38:
            if (!_this2.canMove(0, 0, _this2.rotatePattern(_this2.pattern))) {
              break;
            }
            _this2.rotate();
            break;
          case 39:
            if (!_this2.canMove(1, 0)) {
              break;
            }
            _this2.x += 1;
            break;
          case 40:
            if (!_this2.canMove(0, 1)) {
              break;
            }
            _this2.y += 1;
            break;
          default:
            break;
        }
        _this2.drawAll();
      };
    }
  }, {
    key: 'canMove',
    value: function canMove(xDir, yDir, pattern) {
      var nextX = this.x + xDir;
      var nextY = this.y + yDir;
      var nextPattern = pattern || this.pattern;
      for (var y = 0; y < this.setting.rows; y += 1) {
        for (var x = 0; x < this.setting.cols; x += 1) {
          if (nextPattern[y][x]) {
            if (nextX + x < 0 || nextX + x >= this.setting.fieldCols || nextY + y >= this.setting.fieldRows || !this.fieldBlocksPattern[nextY + y] // 新しくblocksを作る間用
            || this.fieldBlocksPattern[nextY + y][nextX + x]) {
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
      return [[[1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]], [[0, 1, 1, 0], [0, 1, 1, 0], [0, 0, 0, 0], [0, 0, 0, 0]], [[0, 1, 1, 0], [1, 1, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]], [[1, 1, 0, 0], [0, 1, 1, 0], [0, 0, 0, 0], [0, 0, 0, 0]], [[1, 0, 0, 0], [1, 1, 1, 0], [0, 0, 0, 0], [0, 0, 0, 0]], [[0, 0, 1, 0], [1, 1, 1, 0], [0, 0, 0, 0], [0, 0, 0, 0]], [[0, 1, 0, 0], [1, 1, 1, 0], [0, 0, 0, 0], [0, 0, 0, 0]]];
    }
  }]);

  return CurrentBlocks;
}(Blocks);

var FieldBlocks = function (_Blocks2) {
  _inherits(FieldBlocks, _Blocks2);

  function FieldBlocks(ctx, blockWidth, blockHeight, cols, rows, blockRows, drawAll, addScore) {
    _classCallCheck(this, FieldBlocks);

    var _this3 = _possibleConstructorReturn(this, (FieldBlocks.__proto__ || Object.getPrototypeOf(FieldBlocks)).call(this, ctx, blockWidth, blockHeight, cols, rows, drawAll));

    _this3.setting.blockRows = blockRows;
    _this3.pattern = _this3.newPattern();
    _this3.addScore = addScore;
    return _this3;
  }

  _createClass(FieldBlocks, [{
    key: 'move',
    value: function move() {
      for (var y = this.setting.rows - 1; y >= 0; y -= 1) {
        if (this.pattern[y].every(function (elem) {
          return elem === 1;
        })) {
          this.clearRows(y);
          this.addScore();
        }
      }
    }
  }, {
    key: 'clearRows',
    value: function clearRows(row) {
      for (var x = 0; x < this.setting.cols; x += 1) {
        this.pattern[row][x] = 0;
      }
      for (var y = row - 1; y >= 0; y -= 1) {
        this.pattern[y + 1] = this.pattern[y];
      }
      this.drawAll();
    }
  }, {
    key: 'newPattern',
    value: function newPattern() {
      var pattern = [];
      for (var y = -this.setting.blockRows; y < this.setting.rows; y += 1) {
        pattern[y] = [];
        for (var x = 0; x < this.setting.cols; x += 1) {
          pattern[y][x] = 0;
        }
      }
      return pattern;
    }
  }]);

  return FieldBlocks;
}(Blocks);

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
      rows: 20,
      blockCols: 4,
      blockRows: 4
    };
    this.score = 0;
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
      this.initInfo(this.canvas);
    }
  }, {
    key: 'initGameObjects',
    value: function initGameObjects() {
      var fieldsBlocks = new FieldBlocks(this.ctx, this.setting.width / this.setting.cols, this.setting.height / this.setting.rows, this.setting.cols, this.setting.rows, this.setting.blockRows, this.drawAll.bind(this), this.addScore.bind(this));
      this.gameObjects = {
        currentBlocks: this.newCurrentBlocks(fieldsBlocks.pattern),
        fieldBlocks: fieldsBlocks
      };
    }
  }, {
    key: 'initInfo',
    value: function initInfo(selector) {
      var info = document.createElement('div');
      info.setAttribute('id', 'info');
      info.innerHTML = 'SCORE: ' + this.score * 100;
      selector.parentNode.insertBefore(info, selector.nextSibling);
      this.info = document.getElementById('info');
    }
  }, {
    key: 'newCurrentBlocks',
    value: function newCurrentBlocks(fieldsBlocksPattern) {
      return new CurrentBlocks(this.ctx, this.setting.width / this.setting.cols, this.setting.height / this.setting.rows, this.setting.blockCols, this.setting.blockRows, this.setting.cols, this.setting.rows, this.drawAll.bind(this), fieldsBlocksPattern);
    }
  }, {
    key: 'play',
    value: function play() {
      var _this4 = this;

      var timerId = setInterval(function () {
        _this4.drawBackground();
        Object.keys(_this4.gameObjects).forEach(function (key) {
          _this4.gameObjects[key].move();
          _this4.gameObjects[key].draw();
          _this4.fixBlocks();
        });
        _this4.drawInfo();
        if (_this4.isGameOver()) {
          clearInterval(timerId);
          _this4.drawInfo('GAME OVER');
        }
      }, 500);
    }
  }, {
    key: 'drawAll',
    value: function drawAll() {
      var _this5 = this;

      this.drawBackground();
      Object.keys(this.gameObjects).forEach(function (key) {
        _this5.gameObjects[key].draw();
      });
    }
  }, {
    key: 'drawBackground',
    value: function drawBackground() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.save();
      var linGrad = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
      linGrad.addColorStop(0, '#F29492');
      linGrad.addColorStop(0.5, '#114357');
      linGrad.addColorStop(1, '#F29492');
      this.ctx.fillStyle = linGrad;
      this.ctx.fillRect(0, 0, this.setting.width, this.setting.height);
      this.ctx.restore();
    }
  }, {
    key: 'fixBlocks',
    value: function fixBlocks() {
      var _this6 = this;

      if (this.gameObjects.currentBlocks.canMove(0, 1)) {
        return;
      }
      this.gameObjects.currentBlocks.pattern.forEach(function (cols, y) {
        cols.forEach(function (val, x) {
          if (val) {
            _this6.gameObjects.fieldBlocks.pattern[y + _this6.gameObjects.currentBlocks.y][x + _this6.gameObjects.currentBlocks.x] = _this6.gameObjects.currentBlocks.pattern[y][x];
          }
        });
      });
      this.gameObjects.currentBlocks = this.newCurrentBlocks(this.gameObjects.fieldBlocks.pattern);
      this.drawAll();
    }
  }, {
    key: 'addScore',
    value: function addScore() {
      this.score += 1;
    }
  }, {
    key: 'drawInfo',
    value: function drawInfo(message) {
      this.info.innerHTML = 'SCORE: ' + this.score * 100 + ' ' + (message || '');
    }
  }, {
    key: 'isGameOver',
    value: function isGameOver() {
      return this.gameObjects.fieldBlocks.pattern[0].some(function (elem) {
        return elem === 1;
      });
    }
  }]);

  return Tetris;
}();