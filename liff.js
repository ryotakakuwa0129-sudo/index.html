const LIFF_ID = "2008725002-jHJsEKRx";
const GAS_URL = "https://script.google.com/macros/s/AKfycbz910FJbvEKdMV-8dEGncfx2YocZHmNVeuyZHRA26c6SmqEaBEgPzwURfl1fQonvpTbpQ/exec";

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

function closeLiff(delay = 800) {
  setTimeout(() => {
    if (liff.isInClient()) {
      liff.closeWindow();
    }
  }, delay);
}


