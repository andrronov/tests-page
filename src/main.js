import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './vuex/store'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'

const vuetify = createVuetify({
   components,
   directives,
 })

 store.subscribe((mutations, state) => {
  localStorage.setItem('store', JSON.stringify(state))
 })

const app = createApp(App)
app.use(store)
app.use(router)
app.use(vuetify)
app.mount('#app')
