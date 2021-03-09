import BoardSize from "./constants/boardSize";

export default class Tetris {
  constructor({ canvas }) {
    this.canvas = canvas;

    drawInitialGameBoard();
  }

  drawInitialGameBoard() {
    if (this.canvas.getContext) {
      let ctx = canvas.getContext("2d");
      ctx.canvas.width = BoardSize.width * BoardSize.size;
      ctx.canvas.height = BoardSize.height * BoardSize.size;
      ctx.scale(BoardSize.size, BoardSize.size);
    } else {
      // canvas-unsupported
    }
  }
}
