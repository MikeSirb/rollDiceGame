"use strict";

/* === VARIABLEN-SHORTCUTS === */
const score0 = document.getElementById("score--0");
const score1 = document.getElementById("score--1");
const currentScore0 = document.getElementById("current--0");
const currentScore1 = document.getElementById("current--1");
const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");
const namePlayer0 = document.getElementById("name--0");
const namePlayer1 = document.getElementById("name--1");

const rollButton = document.querySelector(".btn--roll");
const holdButton = document.querySelector(".btn--hold");
const newButton = document.querySelector(".btn--new");
const dice = document.querySelector(".dice");

/* === VARIABLEN-PROGRAMM === */
let scores, currentScore, startScore, activePlayer, win;

/* === START-KONDITIONEN */

const startCondition = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  win = false;

  document.querySelector("main").style.backgroundColor =
    "rgb(140, 179, 213, 0.4)";

  player0.classList.add("player--active");
  player1.classList.remove("player--active");
  player0.style.color = "rgb(45, 59, 96)";
  player1.style.color = "rgb(45, 59, 96)";
  namePlayer0.style.color = "rgb(45, 59, 96)";
  namePlayer1.style.color = "rgb(45, 59, 96)";

  score0.textContent = currentScore;
  score1.textContent = currentScore;
  score0.style.color = "rgb(45, 59, 96)";
  score1.style.color = "rgb(45, 59, 96)";
  currentScore0.textContent = currentScore;
  currentScore1.textContent = currentScore;
  dice.classList.add("hidden");
};

startCondition();

let scoreActive = document.querySelector(`#score--${activePlayer}`);
let playerActiveEl = document.querySelector(`.player--${activePlayer}`);
let playerEl = document.querySelector(`#name--${activePlayer}`);

/* === ZUSATZ-FUNKTIONEN === */

const switchPlayer = function () {
  currentScore = 0;
  scoreActive.textContent = currentScore;
  playerActiveEl.classList.remove("player--active");
  activePlayer = activePlayer === 0 ? 1 : 0;

  scoreActive = document.querySelector(`#score--${activePlayer}`);
  playerActiveEl = document.querySelector(`.player--${activePlayer}`);
  playerActiveEl.classList.add("player--active");
};

const winPlayer = function (activePlayer) {
  win = true;
  dice.src = `dice-win-${activePlayer}.png`;
  scoreActive.textContent = "Winner";
  scoreActive.style.color = "#FFF";
  playerEl = document.querySelector(`#name--${activePlayer}`);
  playerEl.style.color = "#FFF";
};

/* === ROLL DICE === */

rollButton.addEventListener("click", function () {
  if (!win) {
    let random = Math.trunc(Math.random() * 6) + 1;
    dice.classList.add("hidden");

    setTimeout(function () {
      dice.src = `dice-${random}.png`;
      dice.classList.remove("hidden");
    }, 50); // 50ms

    if (random === 1) {
      switchPlayer();
    }
    currentScore += random;
    scoreActive.textContent = currentScore;
  }
});

/* === HOLD BUTTON === */

holdButton.addEventListener("click", function () {
  if (!win) {
    scores[activePlayer] += currentScore;

    currentScore0.textContent = scores[0];
    currentScore1.textContent = scores[1];
    if ((scores[0] >= 20) | (scores[1] >= 20)) {
      winPlayer(activePlayer);
    } else {
      switchPlayer();
    }
  }
});

newButton.addEventListener("click", function () {
  startCondition();
});
