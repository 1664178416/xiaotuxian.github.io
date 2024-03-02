import { defineStore } from 'pinia'
import { loginAPI } from '@/apis/user'
import {ref} from 'vue'
export const useUserStore = defineStore('user', ()=>{
  const userInfo=ref({})
  const getUerInfo = async ({account,password}) => {
    const res = await loginAPI({account,password})
    userInfo.value = res.result
  }
  const deleteInfo = () => {
    userInfo.value={}
  }



  return{
    userInfo,
    getUerInfo,
    deleteInfo
  }
},{
  persist:true,
})