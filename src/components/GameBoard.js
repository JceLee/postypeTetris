import { BoardSize } from "../constants/boardSize.js";

export default class GameBoard {
  constructor(ctx) {
    this.ctx = ctx;
    this.grid = this.reset();
  }

  reset() {
    return [...Array(BoardSize.height)].map((e) => Array(BoardSize.width).fill(0));
  }

  render() {
    this.ctx.fillStyle = "#ff9393";
    this.grid.forEach((row, idxY) => {
      row.forEach((value, idxX) => {
        if (value > 0) {
          this.ctx.fillRect(idxX, idxY, 1, 1);
        }
      });
    });
  }

  freeze(block) {
    block.shape.forEach((row, idxY) => {
      row.forEach((value, idxX) => {
        if (value > 0) {
          this.grid[idxY + block.position.y][idxX + block.position.x] = value;
        }
      });
    });
    return this.removeLines();
  }

  removeLines() {
    let lines = 0;
    this.grid.forEach((row, idxY) => {
      if (row.every((value) => value > 0)) {
        lines++;
        this.grid.splice(idxY, 1);
        this.grid.unshift(Array(BoardSize.width).fill(0));
      }
    });
    return lines;
  }
}
