const { commands } = require("./screen");
const Screen = require("./screen");

class Cursor {

  constructor(numRows, numCols) {
    this.numRows = numRows;
    this.numCols = numCols;

    this.row = 0;
    this.col = 0;

    this.gridColor = 'black';
    this.cursorColor = 'cyan';

  }

  resetScreen (r, c) {
    Screen.setBackgroundColor(this.row, this.col, this.gridColor);
    this.row += r;
    this.col += c;
    Screen.setBackgroundColor(this.row, this.col, this.cursorColor);
    Screen.render();
  }

  up= () => {
    if (this.row > 0 && this.row < this.numRows) {
      this.resetScreen(-1, 0);
    }
  }

  down = () => {
    if (this.row >= 0 && this.row < (this.numRows-1)) {
      this.resetScreen(1, 0);
    }
  }

  left = () => {
    if (this.col > 0 && this.col < this.numCols) {
      this.resetScreen(0, -1);
    }
  }

  right = () => {
    if (this.col >= 0 && this.col < (this.numCols-1)) {
      this.resetScreen(0, 1);
    }
  }

}


module.exports = Cursor;
