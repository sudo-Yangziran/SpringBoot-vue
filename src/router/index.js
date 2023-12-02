import { createRouter, createWebHashHistory } from 'vue-router'
import axios from "../http/http.js"

const routes = [
  {
    path: '/',
    name: 'home',
    meta: {
      requireAuth: false
    },
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/login',
    name: 'about',
    component: () => import('../views/index.vue')
  },
  {
	path:'/Admin',
	name:'Admin',
	meta: {
	  requireAuth: true
	},
	component:()=>import('../views/Admin.vue')
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/'
  },
  {
	  path:'/edit',
	  name:'edit',
	  component:()=>import('../components/edit/index.vue')
  },
  {
	  path:'/info',
	  name:'info',
	  component:()=>import('../components/articles/index.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    axios
      .get("/api/v1/auth/check")
      .then(function(res) {
        next(); // 继续路由导航
      })
      .catch(function(error) {
        next('/');
      });
  } else {
    next(); // 继续路由导航
  }
})

export default router
