import '@mdi/font/css/materialdesignicons.css'
import '@/assets/scss/style.scss'
import 'bootstrap'
import { createApp } from 'vue'
// @ts-ignore
import App from './App.vue'
import { registerGlobalComponents } from './utils/registerGlobalComponents.js'
import './utils/registerGlobalSocketHandlers.js'
import { router } from './router.js'

const root = createApp(App)
async function init() {
  await registerGlobalComponents(root)
  root
    .use(router)
    .mount('#app')
}
init()
