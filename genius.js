const crystals = document.querySelectorAll(".crystal");
const startButton = document.getElementById("bMenu");
const buttonText = document.getElementById("tBMenu");
const board = document.querySelector(".genius-board");

const crystalSound = new Audio("assets/657946__lilmati__horror-inspect-sound-ui-or-in-game-notification-02.wav");
crystalSound.volume = 0.5;

let sequence = [];
let playerSequence = [];
let gameStarted = false;
let canClick = false;
let level = 0;
let round = 1;
let activeCrystals = 4;

// aviso
const roundMessage = document.createElement("div");
document.body.appendChild(roundMessage);

Object.assign(roundMessage.style, {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  padding: "35px 80px",
  borderRadius: "24px",
  background: "rgba(10,10,35,0.92)",
  backdropFilter: "blur(18px)",
  border: "1px solid rgba(255,255,255,0.15)",
  fontSize: "64px",
  fontWeight: "900",
  fontFamily: "Arial",
  color: "white",
  opacity: "0",
  transition: "all .45s ease",
  zIndex: "9999"
});

function showMessage(text) {
  roundMessage.textContent = text;
  roundMessage.style.opacity = "1";

  setTimeout(() => {
    roundMessage.style.opacity = "0";
  }, 2000);
}

function flash(card) {
  crystalSound.currentTime = 0;
  crystalSound.play();

  card.classList.add("active");

  setTimeout(() => {
    card.classList.remove("active");
  }, 500);
}

function addToSequence() {
  const randomIndex = Math.floor(Math.random() * activeCrystals);
  sequence.push(randomIndex);
}

function playSequence() {
  canClick = false;
  playerSequence = [];

  sequence.forEach((index, i) => {
    setTimeout(() => flash(crystals[index]), i * 700);
  });

  setTimeout(() => {
    canClick = true;
  }, sequence.length * 700 + 300);
}

function getMaxLevel() {
  if (round === 1) return 1;
  if (round === 2) return 1;
  if (round === 3) return 1;
  if (round === 4) return 1;
  if (round === 5) return 1;
  if (round === 6) return 1;
  if (round === 7) return 1;
  if (round === 8) return 1;
  if (round === 9) return 1;
  if (round === 10) return 1;
}

function unlockRound3() {
  crystals[4].classList.remove("hidden");
  crystals[5].classList.remove("hidden");

  activeCrystals = 6;
  board.classList.add("round3");
}

function unlockRound8() {
  crystals[6].classList.remove("hidden");
  crystals[7].classList.remove("hidden");

  activeCrystals = 8;
  board.classList.add("round8");
}

function updateCrystalTheme() {
  if (round >= 5) {
    board.classList.add("dark-crystals");
  } else {
    board.classList.remove("dark-crystals");
  }
}

function setBoardDifficulty() {
  board.classList.remove("round3", "round8");

  if (round >= 3) board.classList.add("round3");
  if (round >= 8) board.classList.add("round8");

  updateCrystalTheme();
}

function resetGameState() {
  sequence = [];
  playerSequence = [];
  level = 0;
  round = 1;
  activeCrystals = 4;

  setRound(1);
  resetScoreSystem();
}

function nextLevel() {
  level++;

  if (level > getMaxLevel()) {
    round++;

    setRound(round);

    if (round === 2) showMessage("RODADA 2");
    else if (round === 3) {
      showMessage("RODADA 3");
      unlockRound3();
    }
    else if (round === 4) showMessage("RODADA 4");
    else if (round === 5) showMessage("MODO SOMBRIO");
    else if (round === 6) showMessage("RODADA 6");
    else if (round === 7) showMessage("RODADA 7");
    else if (round === 8) {
      showMessage("RODADA 8");
      unlockRound8();
    }
    else if (round === 9) showMessage("RODADA 9");
    else if (round === 10) {
      showMessage("VOCÊ VENCEU");

      gameStarted = false;
      canClick = false;
      buttonText.textContent = "Iniciar Jogo";

      const name = prompt("Seu nome:");
      if (name) addToRanking(name, score);

      resetGameState();
      resetBoardUI();
      return;
    }

    setBoardDifficulty();

    level = 0;
    sequence = [];

    setTimeout(() => nextLevel(), 2000);
    return;
  }

  addToSequence();
  playSequence();
}

function startGame() {
  resetGameState();

  gameStarted = true;

  crystals.forEach(c => c.classList.add("hidden"));

  crystals[0].classList.remove("hidden");
  crystals[1].classList.remove("hidden");
  crystals[2].classList.remove("hidden");
  crystals[3].classList.remove("hidden");

  board.classList.remove("round3", "round8", "dark-crystals");

  setBoardDifficulty();

  showMessage("RODADA 1");

  buttonText.textContent = "Reiniciar";

  setTimeout(() => nextLevel(), 2000);
}

function gameOver() {
  showMessage("GAME OVER");

  gameStarted = false;
  canClick = false;
  buttonText.textContent = "Iniciar Jogo";

  const name = prompt("Seu nome:");
  if (name) addToRanking(name, score);

  resetGameState();
  resetBoardUI();
}

function checkSequence() {
  const i = playerSequence.length - 1;

  if (playerSequence[i] !== sequence[i]) {
    gameOver();
    return;
  }

  if (playerSequence.length === sequence.length) {
    addScore();
    setTimeout(() => nextLevel(), 1000);
  }
}

startButton.addEventListener("click", startGame);

crystals.forEach((card, index) => {
  card.addEventListener("click", () => {
    if (!gameStarted || !canClick || index >= activeCrystals) return;

    flash(card);
    playerSequence.push(index);
    checkSequence();
  });
});

function resetBoardUI() {
  crystals.forEach((c, i) => {
    if (i < 4) c.classList.remove("hidden");
    else c.classList.add("hidden");

    c.classList.remove("active");
  });

  board.classList.remove("round3", "round8", "dark-crystals");
  activeCrystals = 4;
}