import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createStore } from 'vuex'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

const store = createStore({
  state: {
    funds: 100000,
    history: null
  },
  mutations: {
    setFunds(state, newFunds) {
      state.funds = newFunds
    },
    setHistory(state, newHistory) {
        state.history = newHistory
    }
  },
  actions: {
    updateFunds({ commit }, newFunds) {
      commit('setFunds', newFunds)
    },
    updateHistory({ commit }, newHistory) {
        commit('setHistory', newHistory)
    }
  },
  modules: {},
});

app.use(store)
app.mount('#app')
