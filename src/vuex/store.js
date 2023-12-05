import { createStore } from 'vuex'

const store = createStore({
state: {
    user: {
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
    state.user.username = name
  },
  logOut(state){
    state.user.username = null
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