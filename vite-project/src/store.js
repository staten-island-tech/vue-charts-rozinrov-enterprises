import { createStore } from 'vuex'

export default createStore({
  state: {
    funds: 100000,
  },
  mutations: {
    setFunds(state, newFunds) {
      state.funds = newFunds
    },
  },
  actions: {
    updateFunds({ commit }, newFunds) {
      commit('setFunds', newFunds)
    },
  },
  modules: {},
});