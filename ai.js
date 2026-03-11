async function askAI(prompt) {

  try {

    const res = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama3.2:1b",
        prompt: prompt,
        stream: false
      })
    });

    if (!res.ok) {
      throw new Error("HTTP " + res.status);
    }

    const data = await res.json();

    return data.response;

  } catch (err) {

    console.error("AI応答失敗:", err);

    return "AIが応答しませんでした。";

  }

}