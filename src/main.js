import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import './plugin'


Vue.config.productionTip = false
import axios from "axios"
Vue.prototype.$axios = axios
new Vue({
  router,
  store,
  axios,
  render: h => h(App),
}).$mount('#app')
