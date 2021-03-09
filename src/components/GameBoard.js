import BoardSize from "../constants/boardSize";

export default class GameBoard {
  constructor() {
    this.gameBoard = this.reset();
  }

  // 새 게임이 시작되면 보드를 초기화한다.
  reset() {
    return [...Array(BoardSize.height).map((e) => Array(BoardSize.width).fill(0))];
  }

  // 0으로 채워진 행렬을 얻는다.
  render() {}
}
