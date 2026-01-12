const GAS_URL = "https://script.google.com/macros/s/AKfycby0tjXYVUWyPRwqs7r7PwJrrslfTCdZIeQmFwwT1JUfMF9N4a6XwXtgvMz-JDIzIt_mxQ/exec";

async function post(data) {
  const res = await fetch(GAS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  if (!res.ok) {
    throw new Error("HTTP error " + res.status);
  }

  return res.json();
}

async function getUserId() {
  // LINEログインチャンネル対応
  const idToken = liff.getDecodedIDToken();
  return idToken.sub; // ← これが userId
}
