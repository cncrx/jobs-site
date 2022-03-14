import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import Index from "@/views/Index"

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index,
    meta: {
      title: "招聘平台 - 首页"
    }
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import(/* webpackChunkName: "Search" */ "@/views/Search"),
    meta: {
      title: "招聘平台 - 搜索"
    }
  },
  {
    path: '/job/:id',
    name: 'JobDetail',
    component: () => import(/* webpackChunkName: "JobDetail" */ "@/views/JobDetail"),
    meta: {
      title: "招聘平台 - 岗位详细"
    },
    props: true
  },
  {
    path: '/company/:id',
    name: 'CompanyDetail',
    component: () => import(/* webpackChunkName: "CompanyDetail" */ "@/views/CompanyDetail"),
    meta: {
      title: "招聘平台 - 公司详细"
    },
    props: true
  },
  {
    path: '/login',
    name: 'Login', 
    component: () => import(/* webpackChunkName: "Login" */ "@/views/Login"),
    meta: {
      title: "招聘平台 - 登录/注册"
    }
  },
  {
    path: '/personal',
    name: 'PersonalCenter', 
    component: () => import(/* webpackChunkName: "PersonalCenter" */ "@/views/PersonalCenter"),
    meta: {
      title: "招聘平台 - 个人中心",
      requireAuth: true
    }
  },
  {
    path: '/about',
    name: 'About', 
    component: () => import(/* webpackChunkName: "About" */ "@/views/About"),
    meta: {
      title: "招聘平台 - 关于"
    }
  }
]



const router = new VueRouter({
  mode: "history",
  linkExactActiveClass: "active-class",
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.title)
    document.title = to.meta.title
  
  if (to.meta.requireAuth === true) {
    if (window.localStorage.getItem("token") !== null)
      next()
    else {
      new Vue().$message.warning("请登录")
      router.push("/login")
    }
  }

  next()
})

export default router
