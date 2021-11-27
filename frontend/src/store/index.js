import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loadingEmails: true,
    loadingEmail: true,
    emails: [],
    emailsListOffset: 0,
    email: [],
    credentials: null,
    error: null,
    page: 1,
  },
  mutations: {
    startEmailsLoading(state) {
      state.loadingEmails = true;
    },
    endEmailsLoading(state) {
      state.loadingEmails = false;
    },
    startEmailLoading(state) {
      state.loadingEmail = true;
    },
    endEmailLoading(state) {
      state.loadingEmail = false;
    },
    setEmails(state, values) {
      state.emails = values;
    },
    setEmail(state, value) {
      state.email = value;
    },
    unsetError(state) {
      state.error = null;
    },
    setCredentials(state, value) {
      state.credentials = value;
    },
    setError(state, value) {
      state.error = value;
    },
    shiftPage(state, value) {
      state.page = state.page + value;
    },
  },
  actions: {
    async getEmails({ commit, state: { credentials, page } }) {
      commit('unsetError');
      commit('setEmails', []);
      commit('startEmailsLoading');
      const req = await fetch(`   http://localhost:3000/emails?credential_session_id=${credentials}&page=${page}`);
      const emails = await req.json();
      if (req.status === 200) {
        commit('setEmails', emails);
      } else {
        emails.error;
      }
      commit('endEmailsLoading');
    },
    async getEmail({ commit, state: { credentials } }, uid) {
      commit('unsetError');
      commit('setEmail', []);
      commit('startEmailLoading');
      const req = await fetch(`http://localhost:3000/emails/${uid}?credential_session_id=${credentials}`);
      const resp = await req.json();
      if (req.status === 200) {
        console.log(resp);
        commit('setEmail', resp.length > 1 ? resp.filter((part) => part.toLowerCase().includes('<html') ) : resp);
      } else {
        commit('setError', resp.error);
      }
      commit('endEmailLoading');
    },
    async sendEmail({ commit, state: { credentials }}, values) {
      commit('unsetError');
      const req = await fetch(
        'http://localhost:3000/emails',
        {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            credential_session_id: credentials,
            ...values
          })
        }
      );
      const resp = await req.json()

      if (req.status !== 200) {
        commit('setError',  resp.error);
      }
    },
    async createCredentials({ commit }, values) {
      commit('unsetError');
      const req = await fetch(
        'http://localhost:3000/credential_sessions',
        {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...values })
        }

      );

      const resp = await req.json();

      if (resp.id) {
        commit('setCredentials', resp.id);
        } else {
          commit('setError', resp.error);
      }
    },
    removeCredentials({ commit }) {
      commit('setCredentials', null);
    },
    previousPage({ commit }) {
      commit('shiftPage', -1);
    },
    nextPage({ commit }) {
      commit('shiftPage', 1);
    },
  },
  modules: {
  }
})
