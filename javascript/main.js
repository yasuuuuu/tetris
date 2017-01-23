'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Blocks = function () {
  function Blocks() {
    _classCallCheck(this, Blocks);

    this.BLOCKS = Blocks.blockPatterns();
    this.setting = {
      width: 4,
      height: 4
    };
    this.pattern = this.newBlocks();
  }

  _createClass(Blocks, [{
    key: 'newBlocks',
    value: function newBlocks() {
      var id = Math.floor(Math.random() * this.BLOCKS.length);
      var blocks = [];
      for (var y = 0; y < this.setting.height; y += 1) {
        blocks[y] = [];
        for (var x = 0; x < this.setting.width; x += 1) {
          if (this.BLOCKS[id][y]) {
            blocks[y][x] = this.BLOCKS[id][y][x];
          } else {
            blocks[y][x] = 0;
          }
        }
      }
      return blocks;
    }
  }, {
    key: 'move',
    value: function move() {}
  }, {
    key: 'draw',
    value: function draw() {}
  }], [{
    key: 'blockPatterns',
    value: function blockPatterns() {
      var patterns = [[[1, 1, 1, 1], [0, 0, 0, 0]], [[0, 1, 1, 0], [0, 1, 1, 0]], [[0, 1, 1, 0], [1, 1, 0, 0]], [[1, 1, 0, 0], [0, 1, 1, 0]], [[1, 0, 0, 0], [1, 1, 1, 0]], [[0, 0, 1, 0], [1, 1, 1, 0]], [[0, 1, 0, 0], [1, 1, 1, 0]]];
      return patterns;
    }
  }]);

  return Blocks;
}();

window.onload = function () {
  new Tetris('field');
};

var Tetris = function () {
  function Tetris(id) {
    _classCallCheck(this, Tetris);

    this.gameObjects = [];
    this.initCanvas(id);
    setInterval(this.play(), 30);
  }

  _createClass(Tetris, [{
    key: 'initCanvas',
    value: function initCanvas(selector) {
      this.canvas = document.getElementById(selector);
      this.canvas.width = 300;
      this.canvas.height = 600;
      this.ctx = this.canvas.getContext('2d');
      this.drawBackground();
    }
  }, {
    key: 'play',
    value: function play() {
      var gameObjectsFresh = [];

      this.handleGame();
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.drawBackground();
      this.gameObjects.forEach(function (gameObject) {
        gameObject.move();
        gameObject.draw();
        if (gameObject.removeMe === false) {
          gameObjectsFresh.push(gameObject);
        }
      });
      this.gameObjects = gameObjectsFresh;
    }
  }, {
    key: 'drawBackground',
    value: function drawBackground() {
      this.ctx.fillStyle = '#000';
      this.ctx.strokeRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }, {
    key: 'handleGame',
    value: function handleGame() {
      if (this.gameObjects.length) {
        return;
      }
      var blocks = new Blocks();
      this.gameObjects.push(blocks);
    }
  }]);

  return Tetris;
}();