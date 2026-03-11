const HISTORY_KEY = "ai_nag_history";

function saveSearch(query) {

  let history = JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");

  history.push({
    query: query,
    time: Date.now()
  });

  if (history.length > 50) {
    history.shift();
  }

  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}

function getHistory() {

  return JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");

}