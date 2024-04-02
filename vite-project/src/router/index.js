import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: HomeView
    },
    {
      path: '/stock-view/:id',
      name: 'stock-view',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/StockView.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/data2',
      name: 'data2',
      component: () => import('../views/Data2View.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/',
      name: 'signin',
      component: () => import('../views/SignIn.vue') 
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/Register.vue') 
    },
    {
      path: '/history',
      name: 'history',
      component: () => import('../views/History.vue'),
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (getAuth().currentUser) {
      next()
    } else {
      alert('You do not have access!')
      next('/sign-in')
    }
  } else {
    next()
  }
})

export default router
