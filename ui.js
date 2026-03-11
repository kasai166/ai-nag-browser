function showAIMessage(message) {

  const box = document.createElement("div");

  box.id = "ai-nag-box";

  box.innerText = "AI: " + message;

  const target = document.querySelector("#search");

  if (target) {
    target.prepend(box);
  }

}