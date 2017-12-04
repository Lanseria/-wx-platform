import Vue from 'vue'
import Router from 'vue-router'
import signup from '../page/signup'
import signin from '../page/signin'
import index from '../page/index'
import user from '../page/user'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      component: index
    },
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
