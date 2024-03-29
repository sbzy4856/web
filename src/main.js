import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import '@/components/index'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false

import '@/utils'

Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
