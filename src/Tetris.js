import { BoardSize } from "./constants/boardSize.js";
import GameBoard from "./components/GameBoard.js";
import SquareBlock from "./components/SquareBlock.js";
import ScoreBoard from "./components/ScoreBoard.js";
import GameOverModal from "./components/GameOverModal.js";

export default class Tetris {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.ctx.canvas.width = BoardSize.width * BoardSize.size;
    this.ctx.canvas.height = BoardSize.height * BoardSize.size;
    this.ctx.scale(BoardSize.size, BoardSize.size);
    this.gameBoard = new GameBoard(this.ctx);
    this.scoreBoard = new ScoreBoard();
    this.activeBlock = new SquareBlock(this.ctx);
    this.second = 0;
    this.frame = 500;
    this.modal = new GameOverModal();
    this.gameState = {
      level: 1,
      score: 0,
      isStarted: false,
      gameOver: false,
    };
  }

  // 초기 마우스 클릭에 따라 블럭을 움직일 수 있게 이벤트 리스너를 줍니다.
  startGame() {
    if (!this.gameState.isStarted) {
      this.gameState.isStarted = true;
      this.canvas.addEventListener("click", (e) => {
        e.preventDefault();
        this.move(e.offsetX / BoardSize.size);
      });
      this.drop(-1);
    } else {
      this.restart();
    }
    this.scoreBoard.init();
    this.activeBlock.render();
  }

  // 게임을 다시 시작합니다.
  restart() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.gameBoard = new GameBoard(this.ctx);
    this.scoreBoard = new ScoreBoard();
    this.activeBlock = new SquareBlock(this.ctx);
    this.gameState.level = 1;
    this.gameState.score = 0;
    this.gameState.gameOver = false;
  }

  // 이벤트 리스너에 따라 어느쪽으로 움직일지를 결정합니다.
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

  // 새로운 블럭이 생성될 때마다 다시 그려줍니다.
  render() {
    this.activeBlock.render();
    this.gameBoard.render();
  }

  // 가려는 곳이 갈 수 있는 곳인지를 체크 합니다.
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

  // 새로운 블럭을 생성합니다.
  spawnNewBlock() {
    if (this.startGame.gameOver) return;
    this.gameState.score += this.gameBoard.freeze(this.activeBlock);
    this.activeBlock = new SquareBlock(this.ctx);
    if (!this.checkGameOver()) {
      this.startGame.gameOver = true;
      return this.gameOver();
    }
    this.scoreBoard.updateBoard(this.gameState);
  }

  // 게임이 끝났는지 확인합니다.
  checkGameOver() {
    const { x, y } = this.activeBlock.position;
    return this.activeBlock.shape.every((row, idxY) => {
      return row.every((value, idxX) => {
        return this.gameBoard.grid[y + idxY][x + idxX] !== 1;
      });
    });
  }

  // 게임이 끝났을 경우 게임오버 메세지를 띄웁니다.
  gameOver() {
    this.modal.showModal();
  }

  // 블럭이 계속 드랍되게 합니다.
  drop(lastTime = 0) {
    const curTime = new Date().getTime();
    const diff = curTime - lastTime;

    if (diff > this.frame) {
      this.move("down");
      lastTime = curTime;
    }

    requestAnimationFrame(() => this.drop(lastTime));
  }
}
