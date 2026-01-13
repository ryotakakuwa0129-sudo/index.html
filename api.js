const GAS_URL = "https://script.google.com/macros/s/AKfycby0tjXYVUWyPRwqs7r7PwJrrslfTCdZIeQmFwwT1JUfMF9N4a6XwXtgvMz-JDIzIt_mxQ/exec";

async function post(data) {
  const res = await fetch(GAS_URL, {
    method: "POST",
    body: JSON.stringify(data)
  });
  return res.json();
}

async function getUserId() {
  await liff.init({ liffId: "2008725002-jHJsEKRx" });

  // context から取得
  const userId = liff.getContext().userId;

  if (!userId) {
    console.error("ユーザーIDが取得できません");
    alert("ユーザーIDが取得できません。LIFFをLINEアプリで開いてください。");
    return null;
  }
  return userId;
}
