import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
// @ts-ignore
import ElementUI from 'element-ui'
import './styles.scss'
import './plugins/element.js'
import './plugins/axios.js'

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
