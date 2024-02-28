import { createApp } from 'vue'
import io from 'socket.io-client'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(fab, fas, far)
import App from './App.vue'
import router from './router'

const socket = io('http://localhost:5000', { transports: ['websocket', 'polling', 'flashsocket'] })
  const app = createApp(App)
  app.config.globalProperties.$socket = socket;
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(VueSweetalert2);
app.use(router) 
app.mount('#app')
