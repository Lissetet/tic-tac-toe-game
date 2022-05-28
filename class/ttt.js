const Screen = require("./screen");
const Cursor = require("./cursor");

class TTT {

  constructor() {

    this.playerTurn = "O";

    this.grid = [[' ',' ',' '],
                 [' ',' ',' '],
                 [' ',' ',' ']]

    this.cursor = new Cursor(3, 3);

    // Initialize a 3x3 tic-tac-toe grid
    Screen.initialize(3, 3);
    Screen.setGridlines(true);

    Screen.addCommand('z', 'move down', this.cursor.down);
    Screen.addCommand('a', 'move up', this.cursor.up);
    Screen.addCommand('s', 'move left', this.cursor.left);
    Screen.addCommand('d', 'move right', this.cursor.right);
    Screen.addCommand('o', 'player O move', this.makeMoveO);
    Screen.addCommand('x', 'player X move', this.makeMoveX);

    Screen.render();
  }

   makeMove (player) {
    Screen.setGrid(this.cursor.row, this.cursor.col, player);
    this.grid[this.cursor.row][this.cursor.col] = player;
    TTT.checkWin(this.grid);
  }

  makeMoveO = () => this.makeMove('O');
  makeMoveX = () => this.makeMove('X');

  static checkWin(grid) {


    let playerX = 0;
    let playerO = 0;

    //check sets helper function
    function check (arr) {
      if (arr.every((el) => el === 'X')) {
        playerX++;
      } else if (arr.every((el) => el === 'O')) {
        playerO++;
      }
    }

    //check if no win yet
    function isGameOver () {

      let entries = [...grid[0], ...grid[1], ...grid[2]];
      let blanks = entries.filter(el => el === ' ');

      if (blanks.length > 0) {
        return false;
      }

      return true;

    }

    //check for vertical wins
    for (let c = 0; c < 3; c++) {
    //populate col array with column c
    let col = [];
      for (let i = 0; i < 3; i++) {
        let el = grid[i][c];
        col.push(el);
      }

    // run check helper function on col
    check (col);
    }

    // check for horizontal wins
    grid.forEach(check);

    // check for diagonal wins
    let diag1 = [grid[0][0], grid[1][1], grid [2][2]];
    let diag2 = [grid[0][2], grid[1][1], grid [2][0]];

    check (diag1);
    check (diag2);

    if (playerX === playerO && isGameOver()) {
      isGameOver();
      TTT.endGame('T')
      return 'T'
    } else if (playerX < playerO) {
      TTT.endGame('O')
      return 'O'
    } else if (playerX > playerO) {
      TTT.endGame('X')
      return 'X'
    } else {
      return false;
    }



  }

  static endGame(winner) {
    if (winner === 'O' || winner === 'X') {
      Screen.setMessage(`Player ${winner} wins!`);
    } else if (winner === 'T') {
      Screen.setMessage(`Tie game!`);
    } else {
      Screen.setMessage(`Game Over`);
    }
    Screen.render();
    Screen.quit();
  }

}

module.exports = TTT;
