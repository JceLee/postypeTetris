import { BoardSize } from "./constants/boardSize.js";
import GameBoard from "./components/GameBoard.js";
import SquareBlock from "./components/SquareBlock.js";

export default class Tetris {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.ctx.canvas.width = BoardSize.width * BoardSize.size;
    this.ctx.canvas.height = BoardSize.height * BoardSize.size;
    this.ctx.scale(BoardSize.size, BoardSize.size);
    this.gameBoard = new GameBoard();
    this.activeBlock = new SquareBlock(this.ctx, this.gameBoard);

    this.canvas.addEventListener("click", (e) => {
      e.preventDefault();
      console.log(this.gameBoard.gameBoard);
      this.getMousePosition(e.offsetX / BoardSize.size);
    });

    this.startGame();
  }

  startGame() {
    this.activeBlock.render();
  }

  getMousePosition(positionX) {
    if (positionX < this.activeBlock.position.x) {
      this.activeBlock.move("left");
    } else if (positionX > this.activeBlock.position.x + this.activeBlock.shape.length) {
      this.activeBlock.move("right");
    }
  }
}
