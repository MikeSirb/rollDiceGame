"use strict";

/* === VARIABLEN-SHORTCUTS === */
const winEl = document.getElementById("limit");
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

const rulesButton = document.querySelector(".btn--rules");
const aboutButton = document.querySelector(".btn--about");
const blur = document.querySelector(".blur");
const close = document.querySelectorAll(".close");

const rulesModal = document.querySelector(".modal--rules");
const aboutModal = document.querySelector(".modal--about");

/* === VARIABLEN-PROGRAMM === */

let scores, currentScore, startScore, activePlayer, win, winPoints;
let scoreActive = document.querySelector(`#score--${activePlayer}`);
let playerActiveEl = document.querySelector(`.player--${activePlayer}`);
let playerEl = document.querySelector(`#name--${activePlayer}`);

/* === START-KONDITIONEN */

const startCondition = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  win = false;
  winPoints = winEl.value;
  winEl.textContent = winPoints;

  //document.querySelector("main").style.backgroundColor = ("rgb(140, 179, 213, 0.4)");

  player0.classList.add("player--active");
  player0.classList.remove("winner");
  player1.classList.remove("player--active", "winner");

  namePlayer0.style.color = "rgb(45, 59, 96)";
  namePlayer1.style.color = "rgb(45, 59, 96)";

  score0.textContent = currentScore;
  score1.textContent = currentScore;

  currentScore0.textContent = currentScore;
  currentScore1.textContent = currentScore;
  dice.classList.add("hidden");

  scoreActive = document.querySelector(`#score--${activePlayer}`);
  playerActiveEl = document.querySelector(`.player--${activePlayer}`);
  playerEl = document.querySelector(`#name--${activePlayer}`);
};

startCondition();

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

// winPlayer

const winPlayer = function (activePlayer) {
  win = true;
  dice.src = `dice-win-${activePlayer}.png`;
  scoreActive.textContent = "Winner";
  playerEl = document.querySelector(`#name--${activePlayer}`);
  playerActiveEl.classList.add("winner");
};

// openModal

const openModal = function (modal) {
  modal.classList.remove("hidden");
  blur.classList.remove("hidden");
};

// closeModal

const closeModal = function () {
  rulesModal.classList.add("hidden");
  aboutModal.classList.add("hidden");
  blur.classList.add("hidden");
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

    currentScore += random;
    scoreActive.textContent = currentScore;

    if (random === 1) {
      switchPlayer();
    }
  }
});

/* === HOLD BUTTON === */

holdButton.addEventListener("click", function () {
  if (!win) {
    scores[activePlayer] += currentScore;

    currentScore0.textContent = scores[0];
    currentScore1.textContent = scores[1];
    if ((scores[0] >= winPoints) | (scores[1] >= winPoints)) {
      winPlayer(activePlayer);
    } else {
      switchPlayer();
    }
  }
});

newButton.addEventListener("click", function () {
  startCondition();
});

/* === MODAL-WINDOW-BUTTONS */

//open
rulesButton.addEventListener("click", function () {
  openModal(rulesModal);
});

aboutButton.addEventListener("click", function () {
  openModal(aboutModal);
});

//close

for (let i = 0; i < close.length; i++) {
  close[i].addEventListener("click", closeModal);
}

document.addEventListener("keydown", closeModal);
