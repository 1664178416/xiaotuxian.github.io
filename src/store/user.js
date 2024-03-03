import { defineStore } from 'pinia'
import { loginAPI } from '@/apis/user'
import {ref} from 'vue'
import{useCartStore} from './cartStore'

export const useUserStore = defineStore('user', ()=>{
  const cartStore = useCartStore()
  const userInfo=ref({})
  const getUerInfo = async ({account,password}) => {
    //登陆的同时合并本地购物车操作
    const res = await loginAPI({account,password})
    userInfo.value = res.result
    cartStore.mergeCart()
  }
  const deleteInfo = () => {
    userInfo.value={}
    cartStore.clearCart()
  }



  return{
    userInfo,
    getUerInfo,
    deleteInfo
  }
},{
  persist:true,
})