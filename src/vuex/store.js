import { createStore } from 'vuex'

const store = createStore({
state: {
    user: {
        loggedIn: false,
        username: null
    }
},
getters: {
    auth(state) {
        return state.user
    }
},
mutations: {
  logIn(state, name){
    state.user.loggedIn = true
    state.user.username = name
  },
  logOut(state){
    state.user.loggedIn = false
  },
  loadStore(){
    if(localStorage.getItem('store')){
      try{this.replaceState(JSON.parse(localStorage.getItem('store')));}
      catch(e){console.log('store error', e)}
    }
  }
}
})

export default store;