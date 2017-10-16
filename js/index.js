"use-strict";


/**
 * ticTacToeGame.
 * Instantiate the game.
 * @function
*/
const ticTacToeGame = ((documentObject) => {

  /**
   * Tic Tac Toe Class.
   * @class
  */
  class TicTacToe {


    /**
     * Class constructor.
     * @function
    */
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

    /**
     * _checkDiagonal <private>.
     * Check if all squares in diagonal have the same value
     * @function
    */
    _checkDiagonal(array) {
      if ((array[0] === array[4]) && (array[0] === array[8]) && array[0] !== "") {
        this._endGame();
      } else if ((array[2] === array[4]) && (array[2] === array[6]) && array[2] !== "") {
        this._endGame();
      }
    }

    /**
     * _checkRows <private>.
     * Check all rows for possible same value squares
     * @function
    */
    _checkRows(array) {
      let i = 2;
      while (i < array.length) {
        if (array[i] === array[i - 1] && array[i] === array[i - 2] && array[i] !== "") {
          this._endGame();
        }
        i += 3;
      }
    }

    /**
     * _checkColumns <private>.
     * Check all columns for possible same value squares
     * @function
    */
    _checkColumns(array) {
      for (var i = 0; i < 3; i++) {
        if (array[i] === array[i + 3] && array[i] === array[i + 6] && array[i] !== "") {
          this._endGame();
        }
      }
    }

    /**
     * _checkRows <private>.
     * Implement verification for all possible wins.
     * @function
    */
    verifyWinning(array) {
      this._checkColumns(array);
      this._checkRows(array);
      this._checkDiagonal(array);
    }

    /**
     * _check <private>.
     * Event handler, verifies at all times for possible final moves.
     * @function
    */
    _check(target) {
      const values = [];
      const squares = this.gameHolder.querySelectorAll('.squared');

      squares.forEach((square) => {
        values.push(square.innerText);
      });
      this.verifyWinning(values);
    }

    /**
     * _getPlayerSign <private>.
     * Alternates the player sign.
     * @function
    */
    _getPlayerSign() {
      return this.firstPlayer ? "X" : "O";
    }

    /**
     * _bindClickEvent <private>.
     * Check all rows for possible same value squares
     * @function
    */
    _bindClickEvent() {
      this.gameHolder.addEventListener('click', this.clickHandler);
    }

    /**
     * _createSquares <private>.
     * Insert all the squares on the game container.
     * @function
    */
    _createSquares() {
      for (var i = 0; i < 9; i++) {
        let div = documentObject.createElement('div');
        div.className = 'squared';
        this.gameHolder.appendChild(div);
      }
    }

    /**
     * _endGame.
     * Stop receiving user clicks.
     * @function
    */
    _endGame() {
      this.gameHolder.removeEventListener('click', this.clickHandler);
    }

    /**
     * start.
     * Initialize the game.
     * @function
    */
    start() {
      this._createSquares();
      this._bindClickEvent();
    }

    /**
     * start.
     * Restart the game.
     * @function
    */
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
