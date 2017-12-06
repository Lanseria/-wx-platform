import Vue from 'vue'
import Router from 'vue-router'
import signup from '../page/signup'
import signin from '../page/signin'
import user from '../page/user'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/signup',
      component: signup
    },
    {
      path: '/signin',
      component: signin
    },
    {
      path: '/user',
      component: user
    }
  ]
})
