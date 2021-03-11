import Tetris from "./src/Tetris.js";

const app = new Tetris(document.querySelector("#gameBoard"));

const startApp = () => {
  const playButton = document.createElement("input");
  playButton.type = "button";
  playButton.value = "play";
  playButton.id = "play";
  playButton.addEventListener("click", (e) => {
    e.preventDefault();
    app.startGame();
  });
  document.querySelector("#buttonWrapper").appendChild(playButton);
};

startApp();
