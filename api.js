const API = {
  post(action, payload = {}) {
    return fetch(GAS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action,
        ...payload
      })
    }).then(r => r.json());
  },

  register(userId) {
    return this.post("register", { userId });
  },

  addHomework(subject, text, date) {
    return this.post("addHomework", { subject, text, date });
  },

  getUndone(userId) {
    return this.post("getUndoneHomework", { userId });
  },

  done(userId, doneList) {
    return this.post("doneHomework", { userId, doneList });
  }
};
