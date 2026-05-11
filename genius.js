const crystals = document.querySelectorAll(".crystal");
const startButton = document.getElementById("bMenu");
const buttonText = document.getElementById("tBMenu");
const board = document.querySelector(".genius-board");

// som
const crystalSound = new Audio("assets/657946__lilmati__horror-inspect-sound-ui-or-in-game-notification-02.wav");
crystalSound.volume = 0.5;

// debug
const DEBUG_ROUND = 1;

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

roundMessage.style.position = "fixed";
roundMessage.style.top = "50%";
roundMessage.style.left = "50%";
roundMessage.style.transform = "translate(-50%, -50%)";

roundMessage.style.padding = "35px 80px";
roundMessage.style.borderRadius = "24px";

roundMessage.style.background = "rgba(10, 10, 35, 0.92)";
roundMessage.style.backdropFilter = "blur(18px)";
roundMessage.style.border = "1px solid rgba(255,255,255,0.15)";
roundMessage.style.boxShadow = `
  0 0 30px rgba(138,43,226,0.35),
  inset 0 0 20px rgba(255,255,255,0.05)
`;

roundMessage.style.fontSize = "64px";
roundMessage.style.fontWeight = "900";
roundMessage.style.fontFamily = "Arial, sans-serif";
roundMessage.style.letterSpacing = "4px";

roundMessage.style.color = "white";
roundMessage.style.textShadow = "0 0 18px rgba(168,85,247,0.8)";

roundMessage.style.opacity = "0";
roundMessage.style.pointerEvents = "none";
roundMessage.style.transition = "all 0.45s ease";
roundMessage.style.zIndex = "9999";
roundMessage.style.textAlign = "center";

// mostrar aviso
function showMessage(text) {
  roundMessage.textContent = text;

  roundMessage.style.opacity = "0";
  roundMessage.style.transform = "translate(-50%, -50%) scale(0.85)";

  setTimeout(() => {
    roundMessage.style.opacity = "1";
    roundMessage.style.transform = "translate(-50%, -50%) scale(1)";
  }, 50);

  setTimeout(() => {
    roundMessage.style.opacity = "0";
    roundMessage.style.transform = "translate(-50%, -50%) scale(1.08)";
  }, 2000);
}

function playCrystalSound() {
  crystalSound.currentTime = 0;
  crystalSound.play();
}

function flash(card) {
  playCrystalSound();

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
    setTimeout(() => {
      flash(crystals[index]);
    }, i * 800);
  });

  setTimeout(() => {
    canClick = true;
  }, sequence.length * 800);
}

function getMaxLevel() {
  if (round === 1) return 7;
  return 8;
}

function unlockRound3() {
  crystals[4].classList.remove("hidden");
  crystals[5].classList.remove("hidden");

  board.classList.add("round3");

  activeCrystals = 6;
}

function nextLevel() {
  level++;

  if (level > getMaxLevel()) {
    round++;

    if (round === 2) {
      showMessage("RODADA 2");
    } else if (round === 3) {
      showMessage("RODADA 3");
      unlockRound3();
    } else {
      showMessage("VOCÊ VENCEU");
      gameStarted = false;
      buttonText.textContent = "Iniciar Jogo";
      return;
    }

    level = 0;
    sequence = [];

    setTimeout(() => {
      nextLevel();
    }, 2500);

    return;
  }

  addToSequence();
  playSequence();
}

function startGame() {
  sequence = [];
  playerSequence = [];
  level = 0;
  gameStarted = true;

  board.classList.remove("round3");

  crystals[4].classList.add("hidden");
  crystals[5].classList.add("hidden");

  round = DEBUG_ROUND;

  if (DEBUG_ROUND === 3) {
    activeCrystals = 6;
    unlockRound3();
    showMessage("RODADA 3");
  } else if (DEBUG_ROUND === 2) {
    activeCrystals = 4;
    showMessage("RODADA 2");
  } else {
    activeCrystals = 4;
    showMessage("RODADA 1");
  }

  buttonText.textContent = "Reiniciar";

  setTimeout(() => {
    nextLevel();
  }, 2200);
}

function gameOver() {
  showMessage("GAME OVER");
  gameStarted = false;
  buttonText.textContent = "Iniciar Jogo";
}

function checkSequence() {
  const currentMove = playerSequence.length - 1;

  if (playerSequence[currentMove] !== sequence[currentMove]) {
    gameOver();
    return;
  }

  if (playerSequence.length === sequence.length) {
    canClick = false;

    setTimeout(() => {
      nextLevel();
    }, 1000);
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