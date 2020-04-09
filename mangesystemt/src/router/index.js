import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Index from '../views/Index.vue'
import Category from '../views/Category.vue'
import Commodity from '../views/Commodity.vue'
import User from '../views/User.vue'
import Jurisdiction from '../views/Jurisdiction.vue'
import Order from '../views/Order.vue'
import Comdetails from '../views/Comdetails.vue'
import Product from '../views/Product.vue'
import UpdateProduct from '../views/UpdateProduct.vue'
import Addtails from '../views/Addtails.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'home',
    component: Home,
    children: [{ //当前组件的子路由，大白话，在Home组件内部，还有组件切换
      path: 'category',
      name: 'category',
      component: Category
    },
    { //当前组件的子路由，大白话，在Home组件内部，还有组件切换
      path: 'index',
      name: 'index',
      component: Index
    },
    { //当前组件的子路由，大白话，在Home组件内部，还有组件切换
      path: 'product',
      name: 'product',
      redirect:"/home/product/commodity",
      component: Product,
      children: [
        {
          path: 'commodity',
          name: 'commodity',
          component: Commodity,
        },
        {
        path: 'comdetails',
        name: 'comdetails',
        component: Comdetails,
      },
      {
        path: 'updateProduct',
        name: 'updateProduct',
        component: UpdateProduct,
      },
      {
        path: 'addtails',
        name: 'addtails',
        component: Addtails,
      } ]
    },
  
    { //当前组件的子路由，大白话，在Home组件内部，还有组件切换
      path: 'user',
      name: 'user',
      component: User
    },
    { //当前组件的子路由，大白话，在Home组件内部，还有组件切换
      path: 'jurisdiction',
      name: 'jurisdiction',
      component: Jurisdiction
    },
    { //当前组件的子路由，大白话，在Home组件内部，还有组件切换
      path: 'order',
      name: 'order',
      component: Order
    },

    ]

  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: "/login",
    name: "login",
    component: Login
  },
  // {
  //   path:"/category",
  //   name:"category",
  //   component:Category
  // }
]

const router = new VueRouter({
  routes
})

export default router
