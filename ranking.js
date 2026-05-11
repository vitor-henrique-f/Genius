function getRanking() {
  return JSON.parse(localStorage.getItem("ranking")) || [];
}

function saveRanking(ranking) {
  localStorage.setItem("ranking", JSON.stringify(ranking));
}

function addToRanking(name, score) {
  const ranking = getRanking();

  ranking.push({ name, score });

  ranking.sort((a, b) => b.score - a.score);

  saveRanking(ranking.slice(0, 10));
}