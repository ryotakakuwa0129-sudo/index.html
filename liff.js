// 共通LIFF初期化とGAS通信
async function initLiff() {
  await liff.init({ liffId: "YOUR_LIFF_ID" });
}
initLiff();

async function getLiffUserId() {
  if (!liff.isLoggedIn()) await liff.login();
  const profile = await liff.getProfile();
  return profile.userId;
}

async function liffApiCall(payload) {
  const url = "YOUR_GAS_WEBAPP_URL"; // GAS WebApp URLに置き換え
  const resp = await fetch(url, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: { 'Content-Type': 'application/json' }
  });
  return await resp.json();
}
