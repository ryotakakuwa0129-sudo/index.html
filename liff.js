const LIFF_ID = "2008725002-jHJsEKRx";
const app = document.getElementById("app");

/* ================= LIFF初期化 ================= */

document.addEventListener("DOMContentLoaded", async () => {
  await liff.init({ liffId: LIFF_ID });

  if (!liff.isLoggedIn()) {
    liff.login();
    return;
  }

  if (!liff.isInClient()) {
    app.innerHTML = "LINEアプリ内で開いてください";
    return;
  }

  route();
});

/* ================= 共通 ================= */

function getUserId() {
  return liff.getContext().userId;
}

function show(msg) {
  app.innerHTML = `<p class="msg">${msg}</p>`;
  setTimeout(() => liff.closeWindow(), 1200);
}

/* ================= ページ分岐 ================= */

function route() {
  const page = new URLSearchParams(location.search).get("page");
  if (page === "add") renderAdd();
  else if (page === "done") renderDone();
  else if (page === "register") renderRegister();
  else renderMenu();
}

/* ================= メニュー ================= */

function renderMenu() {
  app.innerHTML = `
    <h2>📘 宿題管理</h2>
    <a class="btn" href="?page=add">➕ 追加</a>
    <a class="btn" href="?page=done">✅ 完了</a>
    <a class="btn" href="?page=register">👤 登録</a>
  `;
}

/* ================= 登録 ================= */

function renderRegister() {
  app.innerHTML = `
    <h2>ユーザー登録</h2>
    <button class="btn" id="reg">登録</button>
  `;

  document.getElementById("reg").onclick = async () => {
    await post({ action: "register", userId: getUserId() });
    show("登録しました");
  };
}

/* ================= 宿題追加 ================= */

function renderAdd() {
  const subjects =
    ["国語","数学","理科","社会","英語","音楽","美術","保体","その他"];

  app.innerHTML = `
    <h2>宿題追加</h2>
    <div class="subjects">
      ${subjects.map(s=>`<button class="sub">${s}</button>`).join("")}
    </div>
    <input id="text" placeholder="宿題内容">
    <input id="date" type="date">
    <button class="btn" id="add">追加</button>
  `;

  let subject = "";
  document.querySelectorAll(".sub").forEach(b=>{
    b.onclick = ()=>{
      document.querySelectorAll(".sub").forEach(x=>x.classList.remove("active"));
      b.classList.add("active");
      subject = b.textContent;
    };
  });

  document.getElementById("add").onclick = async () => {
    const text = document.getElementById("text").value;
    const date = document.getElementById("date").value;

    if (!subject || !text || !date) {
      alert("未入力があります");
      return;
    }

    await post({
      action: "addHomework",
      subject,
      text,
      date
    });

    show("追加しました");
  };
}

/* ================= 完了登録 ================= */

async function renderDone() {
  app.innerHTML = `
    <h2>完了登録</h2>
    <div id="list"></div>
    <button class="btn" id="done">完了</button>
  `;

  const list = await post({
    action: "getUndoneHomework",
    userId: getUserId()
  });

  const div = document.getElementById("list");
  div.innerHTML = list.map(v=>`
    <label class="check">
      <input type="checkbox" value="${v}"> ${v}
    </label>
  `).join("");

  document.getElementById("done").onclick = async () => {
    const checked =
      [...document.querySelectorAll("input:checked")].map(i=>i.value);

    if (!checked.length) return;

    await post({
      action: "doneHomework",
      userId: getUserId(),
      doneList: checked
    });

    show("完了しました");
  };
}
;
