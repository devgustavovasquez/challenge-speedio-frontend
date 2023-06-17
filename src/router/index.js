import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UrlsView from '../views/UrlsView.vue'
import DashView from '../views/DashView.vue'
import URLsService from '../services/urls'

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
      async beforeEnter(to, from, next) {
        try {
          const { redirectURL } = await URLsService.getOrigin({ url: to.params.url })
          window.location.href = redirectURL
        } catch (error) {
          next({ name: 'home' })
        }
      }
    }
  ]
})

export default router
