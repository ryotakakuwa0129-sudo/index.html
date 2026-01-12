const GAS_URL = "https://script.google.com/macros/s/AKfycby0tjXYVUWyPRwqs7r7PwJrrslfTCdZIeQmFwwT1JUfMF9N4a6XwXtgvMz-JDIzIt_mxQ/exec"; // ← 最新のデプロイURL

async function post(data) {
  const res = await fetch(GAS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  if (!res.ok) throw new Error("GAS error");
  return res.json();
}

async function initLiff() {
  await liff.init({ liffId: "2008725002-jHJsEKRx" });
}

/**
 * ★ 修正ポイントここだけ
 */
function getUserId() {
  const context = liff.getContext();
  if (!context || !context.userId) {
    throw new Error("userId not available");
  }
  return context.userId;
}

