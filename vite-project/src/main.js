import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createStore } from 'vuex'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAd14eN5PJQCNw0E7L0PbO6xyZ1DuTrSPU",
  authDomain: "rozinrov-enterprises.firebaseapp.com",
  projectId: "rozinrov-enterprises",
  storageBucket: "rozinrov-enterprises.appspot.com",
  messagingSenderId: "1011613985291",
  appId: "1:1011613985291:web:709a538489bba5135bb50e",
  measurementId: "G-NGYHWLX0SF"
};

// Initialize Firebase
initializeApp(firebaseConfig)

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
