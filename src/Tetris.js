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
    this.gameBoard = new GameBoard(this.ctx);
    this.activeBlock = new SquareBlock(this.ctx);
    this.second = 0;
    this.frame = 500;

    this.canvas.addEventListener("click", (e) => {
      e.preventDefault();
      // console.log(this.gameBoard.grid);
      this.move(e.offsetX / BoardSize.size);
    });
  }

  startGame() {
    this.activeBlock.render();
    this.drop(-1);
  }

  move(positionX) {
    if (positionX < this.activeBlock.position.x && this.detect("left")) {
      this.activeBlock.move("left");
    } else if (
      positionX > this.activeBlock.position.x + this.activeBlock.shape.length &&
      this.detect("right")
    ) {
      this.activeBlock.move("right");
    } else {
      this.detect("down") ? this.activeBlock.move("down") : this.spawnNewBlock();
    }
    this.render();
  }

  render() {
    this.activeBlock.render();
    this.gameBoard.render();
  }

  detect(direction) {
    const { x, y } = this.activeBlock.position;
    return this.activeBlock.shape.every((row, idxY) => {
      return row.every((value, idxX) => {
        if (y + idxY === BoardSize.height - 1) return this.spawnNewBlock();
        console.log("1: ", y + idxY < BoardSize.height);
        console.log("2: ", value === 0, this.gameBoard.grid[y + idxY + 1][x + idxX] === 0);
        return direction === "down"
          ? y + idxY < BoardSize.height &&
              (value === 0 || this.gameBoard.grid[y + idxY + 1][x + idxX] === 0)
          : direction === "left"
          ? value === 0 || !this.gameBoard.grid[y + idxY][x + idxX - 1]
          : value === 0 || !this.gameBoard.grid[y + idxY][x + idxX + 1];
      });
    });
  }

  spawnNewBlock() {
    console.log(this.gameBoard.grid);
    console.log(this.gameBoard.freeze(this.activeBlock));
    this.activeBlock = new SquareBlock(this.ctx);
  }

  drop(lastTime) {
    const curTime = new Date().getTime();
    const diff = curTime - lastTime;

    if (diff > this.frame) {
      this.move("down");
      lastTime = curTime;
    }

    requestAnimationFrame(() => {
      this.drop(lastTime);
    });
  }
}
