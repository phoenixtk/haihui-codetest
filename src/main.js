import Vue from 'vue'
import './plugins/element.js'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import './plugins/axios.js'
import './plugins/particles.js'

Vue.config.productionTip = false

let _ = require('lodash');

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
