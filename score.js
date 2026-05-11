let score = 0;
let currentRound = 1;

const scoreDisplay = document.getElementById("scoreDisplay");
const roundDisplay = document.getElementById("roundDisplay");

function updateHUD() {
  scoreDisplay.textContent = score;
  roundDisplay.textContent = currentRound;
}

// pontos por sequência
function addScore() {
  score += 50;
  updateHUD();
}

// atualiza rodada
function setRound(round) {
  currentRound = round;
  updateHUD();
}

// reset geral
function resetScoreSystem() {
  score = 0;
  currentRound = 1;
  updateHUD();
}