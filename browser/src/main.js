import Vue from 'vue'
import App from './App'
import VueLazyLoad from 'vue-lazyload'
import router from './router'
import 'common/stylus/index.styl'
import fastclick from 'fastclick'
import store from './store'
Vue.config.productionTip = false
fastclick.attach(document.body)

Vue.use(VueLazyLoad, {
  loading: require('common/images/default.png')
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
