export default class ScoreBoard {
  init() {
    document.getElementById("scoreBoard").style.display = "block";
  }

  //점수판을 업데이트 합니다.
  updateBoard(state) {
    const { score, level } = state;
    document.getElementById("score").textContent = score;
    document.getElementById("level").textContent = level;
  }
}
