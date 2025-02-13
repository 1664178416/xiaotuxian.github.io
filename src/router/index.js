import { createRouter, createWebHistory,createWebHashHistory } from 'vue-router'
import Login from '@/views/Login/index.vue'
import Layout from '@/views/Layout/index.vue'
// import Home from '@/views/Home/index.vue'
//组件异步加载
const Home = ()=>import('@/views/Home/index.vue')
import Category from '@/views/Category/index.vue'
import SubCategory from '@/views/SubCategory/index.vue'
import Detail from '@/views/Detail/index.vue'
import CartList from '@/views/CartList/index.vue'
import Checkout from '@/views/Checkout/index.vue'
import Pay from '@/views/Pay/index.vue'
import PayBack from '@/views/Pay/PayBack.vue'
import Member from '@/views/Member/index.vue'
import UserInfo from '@/views/Member/components/UserInfo.vue'
import UserOrder from '@/views/Member/components/UserOrder.vue'


const router = createRouter({
   history: createWebHistory(import.meta.env.BASE_URL),
  //history: createWebHashHistory(),//使用哈希模式打包
  //path和component对应关系的位置
  routes: [
    
    {
      path:'/',
      component:Layout,
      children:[
        {
          path:'',
          component:Home,
        },
        {
          path:'/category/:id',
          component:Category,
        },
        {
          path:'/category/sub/:id',
          component:()=>import('@/views/SubCategory/index.vue'),//动态加载组件
        },
        {
          path:'/detail/:id',
          component:Detail,
        },
        {
          path:'/cartlist',
          component:CartList,
        },
        {
          path:'/checkout',
          component:Checkout,
        },
        {
          path:'/pay',
          component:Pay
        },
        {
          path:'/paycallback',
          component:PayBack
        },
        {
          path:'member',
          component:Member,
          children:[
            {
              path:'',
              component:UserInfo,
              
            },
            {
              path:'order',
              component:UserOrder
            }
          ]
        }
      ]
    },
    {
      path:'/login',
      component:Login,
    }
  ],
  //路由行为定制
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
