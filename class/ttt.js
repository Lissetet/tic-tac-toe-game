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

    // Replace this with real commands
    Screen.addCommand('h', 'show commands', Screen.printCommands);
    Screen.addCommand('up', 'move up', this.cursor.up);
    Screen.addCommand('down', 'move down', this.cursor.down);
    Screen.addCommand('left', 'move left', this.cursor.left);
    Screen.addCommand('right', 'move right', this.cursor.right);
    Screen.addCommand('return', 'make move', this.makeMove);

    Screen.setMessage(`Welcome! \nPress 'h' to see list of commands. \n \nPlayer ${this.playerTurn}, make your move.`)

    Screen.setBackgroundColor(this.cursor.row, this.cursor.col, this.cursor.cursorColor);

    Screen.render();
  }

  makeMove = () => {
    let player = this.playerTurn;

    //check if space is blank
    if (Screen.grid[this.cursor.row][this.cursor.col] === ' ') {
      //place move
      Screen.setGrid(this.cursor.row, this.cursor.col, player);

      //check for winner
      let winner = TTT.checkWin(Screen.grid);
      if (winner !== false) {
        TTT.endGame(winner);
      }

      //next player's turn
      if (this.playerTurn === 'X') {
        this.playerTurn = 'O';
      } else {
        this.playerTurn = 'X'
      }
      Screen.setMessage(`Player ${this.playerTurn}, it's your move.`)

    } else {
      Screen.setMessage(`Player ${this.playerTurn}, it's your move. \n \nInvalid move, space is already taken.`)
    }
    Screen.render();

  }

  static checkWin(grid) {
    //default winner to false, no winner yet
    let winner = false;

    //declare empty array to hold all possible win combinations
    const possibleWins = [];

    //helper function to check for wins
    function check (arr) {
      if (arr.every((el) => el === 'X')) {
        winner = 'X';
      } else if (arr.every((el) => el === 'O')) {
        winner = 'O';
      }
    }

    //function to check if there are blank spaces left
    function isGameOver () {
      let blanks = possibleWins.flat().filter(el => el === ' ').length;

      //set winner to tie if no blanks left and no winner
      if (blanks === 0 && winner === false) {
        winner = 'T'
      }
    }

    //add horizontal rows to possibleWins
    grid.forEach(row => possibleWins.push(row));

    //add diagonals to possibleWins
    possibleWins.push([grid[0][0], grid[1][1], grid [2][2]]);
    possibleWins.push([grid[0][2], grid[1][1], grid [2][0]]);

    //add columns to possibleWins
    for (let c = 0; c < grid[0].length; c++) {
      //populate col array with column c
      let col = [];
        for (let i = 0; i < grid.length; i++) {
          let el = grid[i][c];
          col.push(el);
        }

      // add col array to possibleWins
      possibleWins.push(col);
      }

    //check for wins
    possibleWins.forEach(check);

    //check if game is over
    isGameOver();

    return winner;

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
