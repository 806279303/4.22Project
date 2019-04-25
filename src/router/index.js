import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

//路由相关地址
const routes = [
  {
    path: '/HomePage',
    name: 'HomePage',
    component: () => import('@/components/HomePage/HomePage'),
    meta: { title: 'HomePage', noCache: true }
  },
  {
    path: '/Login',
    name: 'Login',
    component: () => import('@/components/Login/Login'),
    meta: { title: 'login', noCache: true }
  },
  {
    path: '/Register',
    name: 'Register',
    component: () => import('@/components/Register/Register'),
    meta: { title: 'register', noCache: true }
  },
  // 重定向
  {
    path: '/',
    redirect: '/Login'
  }
]

// 实例化
const router = new Router({
  routes,
  mode: 'history'
})


export default router
