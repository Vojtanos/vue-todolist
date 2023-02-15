import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vSelect from "vue-select"
import store from './store/index.js'

const app = createApp(App)

app.use(store)
app.use(router)

app.component("v-select", vSelect)
app.mount('#app')
