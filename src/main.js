import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import VueClipboards from 'vue-clipboard2'

createApp(App)
  .use(VueClipboards)
  .mount('#app')
