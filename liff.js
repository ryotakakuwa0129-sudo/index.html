// =====================
// 設定
// =====================
const LIFF_ID = "2008725002-jHJsEKRx";
const GAS_URL = "https://script.google.com/macros/s/AKfycby0tjXYVUWyPRwqs7r7PwJrrslfTCdZIeQmFwwT1JUfMF9N4a6XwXtgvMz-JDIzIt_mxQ/exec";
// =====================
// =====================
let userId = null;

// =====================
// LIFF共通初期化
// =====================
async function initLIFF(page) {
  await liff.init({ liffId: LIFF_ID });

  if (!liff.isLoggedIn()) {
    liff.login();
    return;
  }

  userId = liff.getDecodedIDToken().sub;

  // ページ別処理
  if (page === "add") initAdd();
  if (page === "done") initDone();
  if (page === "register") initRegister();
}

// =====================
// GAS API
// =====================
async function api(action, data={}) {
  const res = await fetch(GAS_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action, userId, ...data })
  });
  return JSON.parse(await res.text());
}
