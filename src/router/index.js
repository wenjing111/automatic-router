import Vue from 'vue'
import VueRouter from 'vue-router'
import routeArr from '@/utils/pages'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/Home',
  },
  ...routeArr,
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes,
})

export default router
