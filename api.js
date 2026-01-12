const GAS_URL = "https://script.google.com/macros/s/AKfycby0tjXYVUWyPRwqs7r7PwJrrslfTCdZIeQmFwwT1JUfMF9N4a6XwXtgvMz-JDIzIt_mxQ/exec"; // ← 最新のデプロイURL
async function post(data) {
  const res = await fetch(GAS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  return res.json();
}

async function initLiff() {
  await liff.init({ liffId: "LIFF_ID" });
}

function getUserIdFromUrl() {
  const p = new URLSearchParams(location.search);
  return p.get("uid");
}

