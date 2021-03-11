export default class SquareBlock {
  constructor(ctx) {
    this.ctx = ctx;
    this.shape = [
      [1, 1],
      [1, 1],
    ];
    this.position = { x: 4, y: 0 };
  }

  // 위치가 변경된 블럭을 그려줍니다.
  render() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.ctx.fillStyle = "#ff9393";
    this.shape.forEach((row, idxY) => {
      row.forEach((value, idxX) => {
        if (value === 1) {
          this.ctx.fillRect(this.position.x + idxX, this.position.y + idxY, 1, 1);
        }
      });
    });
  }

  // 블럭의 위치를 변경합니다.
  move(direction) {
    if (direction === "left") {
      this.position.x -= 1;
    } else if (direction === "right") {
      this.position.x += 1;
    } else {
      this.position.y += 1;
    }
  }
}
