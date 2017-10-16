"use-strict";

const ticTacToeGame = ((documentObject) => {


  class TicTacToe {

    constructor(gameHolderId) {
      this.firstPlayer = true;
      this.gameHolder = documentObject.getElementById('game-holder');
      this.clickHandler = (ev) => {
        if (ev.target.innerText === "") {
          ev.target.innerText = this._getPlayerSign();
          this.firstPlayer = !this.firstPlayer;
          this._check(ev.target);
        }
      };
    }

    _checkDiagonal(array) {
      if ((array[0] === array[4]) && (array[0] === array[8]) && array[0] !== "") {
        this.endGame();
      } else if ((array[2] === array[4]) && (array[2] === array[6]) && array[2] !== "") {
        this.endGame();
      }
    }

    _checkRows(array) {
      let i = 2;
      while (i < array.length) {
        if (array[i] === array[i - 1] && array[i] === array[i - 2] && array[i] !== "") {
          this.endGame();
        }
        i += 3;
      }
    }

    _checkColumns(array) {
      for (var i = 0; i < 3; i++) {
        if (array[i] === array[i + 3] && array[i] === array[i + 6] && array[i] !== "") {
          this.endGame();
        }
      }
    }

    verifyWinning(array) {
      this._checkColumns(array);
      this._checkRows(array);
      this._checkDiagonal(array);
    }

    _check(target) {
      const values = [];
      const squares = this.gameHolder.querySelectorAll('.squared');

      squares.forEach((square) => {
        values.push(square.innerText);
      });
      this.verifyWinning(values);
    }

    _getPlayerSign() {
      return this.firstPlayer ? "X" : "O";
    }

    bindClickEvent() {
      this.gameHolder.addEventListener('click', this.clickHandler);
    }

    _createSquares() {
      for (var i = 0; i < 9; i++) {
        let div = documentObject.createElement('div');
        div.className = 'squared';
        this.gameHolder.appendChild(div);
      }
    }

    endGame() {
      this.gameHolder.removeEventListener('click', this.clickHandler);
    }

    start() {
      this._createSquares();
      this.bindClickEvent();
    }

    restart() {
      this.gameHolder.removeEventListener('click', this.clickHandler);
      while(this.gameHolder.firstChild) {
        this.gameHolder.firstChild.remove();
      }
      this.start();
    }
  };

  const game = new TicTacToe()

  return {
    start: game.start.bind(game),
    restart: game.restart.bind(game),
  }
})(document);

const resetButton = document.getElementById('reset-button');
ticTacToeGame.start();

resetButton.addEventListener('click', (ev) => {
  ticTacToeGame.restart();
});
