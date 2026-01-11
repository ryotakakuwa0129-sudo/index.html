const GAS_URL = "https://script.google.com/macros/s/AKfycby0tjXYVUWyPRwqs7r7PwJrrslfTCdZIeQmFwwT1JUfMF9N4a6XwXtgvMz-JDIzIt_mxQ/exec";

const API = {
  post(action, data) {
    return fetch(GAS_URL, {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({ action, ...data })
    }).then(r=>r.json());
  },
  register(userId){ return this.post("register",{userId}); },
  addHomework(subject,text,date){
    return this.post("addHomework",{subject,text,date});
  },
  getUndone(userId){
    return this.post("getUndoneHomework",{userId});
  },
  doneHomework(userId,doneList){
    return this.post("doneHomework",{userId,doneList});
  }
};

