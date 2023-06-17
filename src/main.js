import './assets/global.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

import Vue3Toasity from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

const pinia = createPinia()
const app = createApp(App)

app.use(Vue3Toasity, {
  theme: 'colored',
  position: 'top-right'
})
app.use(router)
app.use(pinia)
app.mount('#app')
