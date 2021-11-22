import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Compose from '../views/Compose.vue'
import Show from '../views/Show.vue'

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
    path: '/show/:id',
    name: 'Show',
    component: Show
  }
]

const router = new VueRouter({
  routes
})

export default router
