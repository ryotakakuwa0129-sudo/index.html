const LIFF_ID = "2008725002-jHJsEKRx";

const params = new URLSearchParams(location.search);
const page = params.get("page") || "menu";

async function init() {
  await liff.init({ liffId: LIFF_ID });

  if (!liff.isLoggedIn()) {
    liff.login();
    return;
  }

  if (page === "register") renderRegister();
  if (page === "add") renderAdd();
  if (page === "done") renderDone();
}

function renderRegister() {
  document.getElementById("app").innerHTML = `
    <div class="card">
      <h1>登録</h1>
      <button class="primary" onclick="register()">登録する</button>
    </div>`;
}

async function register() {
  await API.register(liff.getContext().userId);
  liff.closeWindow();
}

function renderAdd() {
  document.getElementById("app").innerHTML = `
  <div class="card">
    <h1>宿題追加</h1>

    <div class="subjects">
      ${["国語","数学","理科","社会","英語","音楽","美術","保体","その他"]
        .map(s=>`<button onclick="selectSubject('${s}')">${s}</button>`).join("")}
    </div>

    <textarea id="text" placeholder="宿題内容"></textarea>
    <input type="date" id="date">
    <button class="primary" onclick="addHomework()">追加</button>
  </div>`;
}

let selectedSubject = "";
function selectSubject(s) {
  selectedSubject = s;
}

async function addHomework() {
  await API.addHomework(
    selectedSubject,
    document.getElementById("text").value,
    document.getElementById("date").value
  );
  liff.closeWindow();
}

async function renderDone() {
  const list = await API.getUndone(liff.getContext().userId);

  document.getElementById("app").innerHTML = `
  <div class="card">
    <h1>完了登録</h1>
    <div id="list">
      ${list.map(t=>`
        <label class="check">
          <input type="checkbox" value="${t}">${t}
        </label>`).join("")}
    </div>
    <button class="primary" onclick="done()">完了</button>
  </div>`;
}

async function done() {
  const checked = [...document.querySelectorAll("input:checked")]
    .map(i=>i.value);
  await API.doneHomework(liff.getContext().userId, checked);
  liff.closeWindow();
}

init();

