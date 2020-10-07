import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'LogIn',
    component: () => import(/* webpackChunkName: "about" */ '../views/SignInUp.vue')
  },
  {
    path: '/post-add',
    name: 'PostAdd',
    component: () => import(/* webpackChunkName: "about" */ '../views/PostAdd.vue'),
    meta: { 
      requiresAuth: true
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import(/* webpackChunkName: "about" */ '../views/Profile.vue'),
    meta: { 
      requiresAuth: true
    }
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
      if (localStorage.getItem('nijepa_blog_user') == null) {
          next({
              path: '/login',
              params: { nextUrl: to.fullPath }
          })
      } else {
        next()
      }
  }else {
      next() 
  }
})

export default router
