export default class ScoreBoard {
  init() {
    document.getElementById("scoreBoard").style.display = "block";
  }

  updateBoard(state) {
    const { score, level } = state;
    document.getElementById("score").textContent = score;
    document.getElementById("level").textContent = level;
  }
}
