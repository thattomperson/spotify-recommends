import Vue from 'vue'
import axios from 'axios'
import App from './App.vue'
import store from './store'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faSyncAlt)
Vue.component('fa', FontAwesomeIcon)

Vue.config.productionTip = false

Vue.prototype.$http = axios

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
