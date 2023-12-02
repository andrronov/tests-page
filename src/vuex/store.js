import { createStore } from 'vuex'

const store = createStore({
  state () {
    return {
      loggedIn: false
    }
  },
  mutations: {
   setLoggedIn(state, value){
      state.loggedIn = value;
   }
  },
  actions: {
   login({commit}){
      commit('setLoggedIn', true);
   }
  }
})

export default store;