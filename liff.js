const LIFF_ID = "PASTE_YOUR_LIFF_ID";
const GAS_URL = "PASTE_YOUR_GAS_URL";

let subjects = [];

async function init() {
  await liff.init({ liffId: LIFF_ID });
  showPage();
  bind();
}

function showPage() {
  const page = new URLSearchParams(location.search).get("page") || "list";
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.getElementById("page-" + page).classList.add("active");

  if (page === "list") loadList();
}

function bind() {
  document.getElementById("registerBtn")?.addEventListener("click", register);
  document.getElementById("addBtn")?.addEventListener("click", addHomework);
  document.getElementById("doneBtn")?.addEventListener("click", doneHomework);

  document.querySelectorAll(".subjects button").forEach(btn => {
    btn.addEventListener("click", () => {
      btn.classList.toggle("active");
      const t = btn.textContent;
      subjects.includes(t)
        ? subjects = subjects.filter(x => x !== t)
        : subjects.push(t);
    });
  });
}

async function register() {
  await API.register(liff.getContext().userId);
  liff.closeWindow();
}

async function addHomework() {
  await API.addHomework(
    subjects.join(","),
    document.getElementById("text").value,
    document.getElementById("date").value
  );
  liff.closeWindow();
}

async function loadList() {
  const list = document.getElementById("list");
  list.innerHTML = "";

  const data = await API.getUndone(liff.getContext().userId);
  data.forEach(t => {
    list.innerHTML += `
      <div class="card">
        <label>
          <input type="checkbox" value="${t}">
          ${t}
        </label>
      </div>`;
  });
}

async function doneHomework() {
  const checked = [...document.querySelectorAll("input:checked")]
    .map(c => c.value);

  await API.done(liff.getContext().userId, checked);
  loadList();
}

init();


