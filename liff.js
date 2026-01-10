const LIFF_ID = "2008725002-jHJsEKRx";

let userId = "";
let subject = "";

function getPage(){
  return new URLSearchParams(location.search).get("page") || "add";
}

function showPage(){
  document.querySelectorAll(".page").forEach(p=>p.style.display="none");
  document.getElementById("page-"+getPage()).style.display="block";
}

document.addEventListener("DOMContentLoaded", showPage);

async function init(){
  await liff.init({liffId:LIFF_ID});
  if(!liff.isLoggedIn()){
    liff.login();
    return;
  }
  userId = (await liff.getProfile()).userId;

  if(getPage()==="done"){
    loadUndone();
  }
}
init();

/* ===== グローバル関数（onclick用） ===== */

window.selectSubject = btn=>{
  document.querySelectorAll(".subjects button")
    .forEach(b=>b.classList.remove("active"));
  btn.classList.add("active");
  subject = btn.textContent;
};

window.register = async ()=>{
  await api({action:"register",userId});
  location.href="index.html?page=add";
};

window.addHomework = async ()=>{
  const text = document.getElementById("text").value;
  const date = document.getElementById("date").value;
  if(!subject||!text||!date){
    alert("すべて入力してください");
    return;
  }
  await api({action:"addHomework",subject,text,date});
  liff.closeWindow();
};

async function loadUndone(){
  const list = await api({action:"getUndoneHomework",userId});
  const box = document.getElementById("done-list");
  box.innerHTML="";
  list.forEach(t=>{
    const div=document.createElement("div");
    div.className="item";
    div.innerHTML=`<input type="checkbox" value="${t}"><span>${t}</span>`;
    box.appendChild(div);
  });
}

window.doneHomework = async ()=>{
  const done=[...document.querySelectorAll("#done-list input:checked")]
    .map(i=>i.value);
  if(!done.length) return;
  await api({action:"doneHomework",userId,doneList:done});
  liff.closeWindow();
};


