import { BoardSize } from "./constants/boardSize.js";
import GameBoard from "./components/GameBoard.js";
import SquareBlock from "./components/SquareBlock.js";
import ScoreBoard from "./components/ScoreBoard.js";

export default class Tetris {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.gameBoard = new GameBoard(this.ctx);
    this.scoreBoard = new ScoreBoard();
    this.activeBlock = new SquareBlock(this.ctx);
    this.second = 0;
    this.frame = 500;
    this.gameState = {
      level: 1,
      score: 0,
    };
  }

  startGame() {
    this.ctx.canvas.width = BoardSize.width * BoardSize.size;
    this.ctx.canvas.height = BoardSize.height * BoardSize.size;
    this.ctx.scale(BoardSize.size, BoardSize.size);
    this.canvas.addEventListener("click", (e) => {
      e.preventDefault();
      this.move(e.offsetX / BoardSize.size);
    });
    this.scoreBoard.init();
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
    } else if (this.detect("down")) {
      this.activeBlock.move("down");
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
        if (y + idxY === BoardSize.height - 1 || this.gameBoard.grid[y + idxY + 1][x + idxX] === 1)
          return this.spawnNewBlock();
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
    this.gameState.score += this.gameBoard.freeze(this.activeBlock);
    this.activeBlock = new SquareBlock(this.ctx);
    this.scoreBoard.updateBoard(this.gameState);
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
