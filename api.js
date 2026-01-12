const GAS_URL = "https://script.google.com/macros/s/AKfycby0tjXYVUWyPRwqs7r7PwJrrslfTCdZIeQmFwwT1JUfMF9N4a6XwXtgvMz-JDIzIt_mxQ/exec"; // 最新のデプロイURL
const LIFF_ID = "2008725002-jHJsEKRx";

async function post(data) {
  const res = await fetch(GAS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  if (!res.ok) {
    throw new Error("GAS error");
  }

  return res.json();
}

async function initLiff() {
  await liff.init({ liffId: LIFF_ID });
}

async function getUserId() {
  const profile = await liff.getProfile();
  return profile.userId;
}

/**
 * 登録チェック
 */
async function checkRegistered(userId) {
  const res = await post({
    action: "checkUser",
    userId
  });
  return res.registered === true;
}
