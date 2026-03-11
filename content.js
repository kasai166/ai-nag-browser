(function () {

  const params = new URLSearchParams(window.location.search);

  const query = params.get("q");

  if (!query) return;

  saveSearch(query);

  const history = getHistory();

  const recent = history
    .slice(-5)
    .map(h => h.query)
    .join(", ");

  const prompt = `
User searched: ${query}

Recent searches:
${recent}

Roast the user sarcastically in one sentence.
`;

  askAI(prompt).then((response) => {

    showAIMessage(response);

  });

})();