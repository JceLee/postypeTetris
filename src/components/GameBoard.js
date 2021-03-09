import { BoardSize } from "../constants/boardSize.js";

export default class GameBoard {
  constructor() {
    this.gameBoard = this.reset();
  }

  reset() {
    return [...Array(BoardSize.height)].map((e) => Array(BoardSize.width).fill(0));
  }

  render(block) {
    block.shape.forEach((row, idxY) => {
      row.forEach((value, idxX) => {
        if (value > 0) {
          this.gameBoard[idxY + block.position.y][idxX + block.position.x] = value;
        }
      });
    });
  }
}
