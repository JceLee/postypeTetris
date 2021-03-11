import { BoardSize } from "../constants/boardSize.js";

export default class GameBoard {
  constructor(ctx) {
    this.ctx = ctx;
    this.grid = this.reset();
  }

  reset() {
    return [...Array(BoardSize.height)].map((e) => Array(BoardSize.width).fill(0));
  }

  // 블럭이 밑에 쌓이면 쌓인 것을 보드에 그립니다.
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

  // 쌓인 블럭을 보드에 기록합니다.
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

  // 한줄을 블럭으로 가득 채웠을 때, 라인을 지워줍니다.
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
