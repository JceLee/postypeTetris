import { BoardSize } from "../constants/boardSize.js";

export default class SquareBlock {
  constructor(ctx, boardState) {
    this.ctx = ctx;
    this.boardState = boardState;
    this.color = "#ff9393";
    this.shape = [
      [1, 1],
      [1, 1],
    ];
    this.position = { x: 4, y: 0 };
  }

  render() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.ctx.fillStyle = this.color;
    this.shape.forEach((row, idxY) => {
      row.forEach((value, idxX) => {
        if (value === 1) {
          this.ctx.fillRect(this.position.x + idxX, this.position.y + idxY, 1, 1);
        }
      });
    });
  }

  move(direction) {
    if (direction === "left") {
      this.position.x -= 1;
    } else if (direction === "right") {
      this.position.x += 1;
    } else {
      this.potision.y += 1;
    }
    this.render();
  }
}
