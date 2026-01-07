const LIFF_ID = "YOUR_LIFF_ID";
const GAS_URL = "YOUR_GAS_WEBAPP_URL";

async function initLiff() {
  await liff.init({ liffId: LIFF_ID });
  if (!liff.isLoggedIn()) {
    liff.login();
    return;
  }
}

function getUserId() {
  return liff.getDecodedIDToken().sub;
}

