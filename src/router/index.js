import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(Router)

const router = new Router({
  routes: [{
    path: '/',
    name: 'Home',
    component: Home
  }, {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login/login.vue')
  }]
})

// 路由守卫
router.beforeEach((to, from, next) => {
  const isLogin = !!localStorage.userkey

  if (to.path === '/login') {
    next()
  } else {
    isLogin ? next() : next('/login')
  }
})


export default router
