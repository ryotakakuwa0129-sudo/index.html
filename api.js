const GAS_URL = "https://script.google.com/macros/s/AKfycby0tjXYVUWyPRwqs7r7PwJrrslfTCdZIeQmFwwT1JUfMF9N4a6XwXtgvMz-JDIzIt_mxQ/exec";

// GAS に POST
async function post(data) {
  const res = await fetch(GAS_URL, {
    method: "POST",
    body: JSON.stringify(data)
  });
  return res.json();
}

// ユーザーID取得（Contextから確実に）
async function getUserId() {
  await liff.init({ liffId: "2008725002-jHJsEKRx" });

  const context = liff.getContext();
  const userId = context.userId;

  if (!userId) {
    console.error("ユーザーIDが取得できません。LINEアプリで開いてください。");
    alert("ユーザーIDが取得できません。LINEアプリで開いてください。");
    return null;
  }
  return userId;
}

// 登録ボタン押下時
export async function registerUser() {
  const userId = await getUserId();
  if (!userId) return;

  const res = await post({ action: "register", userId });
  if (res.ok) {
    alert("✅ 登録完了しました");
    liff.closeWindow();
  } else {
    alert("登録に失敗しました。もう一度お試しください");
    console.error(res);
  }
}

