// content.js からメッセージを受け取り、ローカルの Ollama API を叩いて結果を返す。
// (CORS 回避のため、fetch は background で行う設計)

chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
  if (!req || req.type !== "AI_REQUEST") {
    return; 
  }

  (async () => {
    try {
      const res = await fetch("http://localhost:11434/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: req.model || "llama3.2:1b",
          prompt: req.prompt,
          stream: false
        })
      });

      // ステータス確認
      if (!res.ok) {
        const text = await res.text().catch(()=>"");
        sendResponse({ ok: false, text: `HTTP ${res.status} ${res.statusText} ${text}` });
        return;
      }

      const data = await res.json().catch(()=>null);

      if (!data) {
        sendResponse({ ok: false, text: "Invalid JSON from Ollama" });
        return;
      }

      // data.response を返す
      sendResponse({ ok: true, text: data.response || (data?.response_text || "No response") });

    } catch (err) {
      // ネットワーク等のエラー
      console.error("background fetch error:", err);
      sendResponse({ ok: false, text: "AI connection failed: " + (err.message || err) });
    }
  })();

 
  return true;
});