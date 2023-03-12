import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vSelect from "vue-select"
import store from './store/index.js'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faChessQueen } from '@fortawesome/free-solid-svg-icons'



const app = createApp(App)

library.add(faChessQueen)
app.component('font-awesome-icon', FontAwesomeIcon)

app.use(store)
app.use(router)

app.component("v-select", vSelect)
app.mount('#app')
