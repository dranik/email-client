import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Compose from '../views/Compose.vue'
import Show from '../views/Show.vue'
import Credentials from '../views/Credentials'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/compose',
    name: 'Compose',
    component: Compose
  },
  {
    path: '/show/:uid',
    name: 'Show',
    component: Show
  },
  {
    path: '/credentials',
    name: 'Credentials',
    component: Credentials
  }
]

const router = new VueRouter({
  routes
})

export default router
