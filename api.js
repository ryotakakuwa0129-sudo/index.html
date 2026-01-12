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
  if (!liff.isInitialized()) {
    await liff.init({ liffId: "2008725002-jHJsEKRx" });
  }
}

/**
 * FlexのURIから userId を受け取る
 * ※ getProfile は使わない
 */
function getUserIdFromUrl() {
  const params = new URLSearchParams(location.search);
  return params.get("uid");
}
