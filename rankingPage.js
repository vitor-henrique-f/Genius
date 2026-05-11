function loadRanking() {
  const container = document.getElementById("rankingList");

  // pega direto do localStorage (sem depender de ranking.js)
  const ranking = JSON.parse(localStorage.getItem("ranking")) || [];

  container.innerHTML = "";

  if (ranking.length === 0) {
    container.innerHTML = `
      <p style="color:white; text-align:center;">
        Nenhum jogador ainda 😢
      </p>
    `;
    return;
  }

  ranking.forEach((player, index) => {
    const item = document.createElement("div");
    item.classList.add("ranking-item");

    item.innerHTML = `
      <div class="ranking-pos">${index + 1}º</div>
      <div class="ranking-name">${player.name}</div>
      <div class="ranking-score">${player.score}</div>
    `;

    container.appendChild(item);
  });
}

loadRanking();