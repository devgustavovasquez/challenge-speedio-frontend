import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UrlsView from '../views/UrlsView.vue'
import DashView from '../views/DashView.vue'
import RedirectView from '../views/RedirectView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/urls',
      name: 'urls',
      component: UrlsView
    },
    {
      path: '/dash',
      name: 'dash',
      component: DashView
    },
    {
      path: '/:url',
      name: 'redirect',
      component: RedirectView
    }
  ]
})

export default router
