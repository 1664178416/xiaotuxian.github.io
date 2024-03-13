import axios from 'axios'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/store/user'
import 'element-plus/theme-chalk/el-message.css'
import router from '@/router'
const httpInstance = axios.create({
  baseURL:'https://pcapi-xiaotuxian-front-devtest.itheima.net',
  timeout:5000
})

// axios请求拦截器
httpInstance.interceptors.request.use(config => {
  //请求之前要拿到token
  const userStore=useUserStore()
  //从pinia中拿到token
  const token = userStore.userInfo.token
  if(token){
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, e => Promise.reject(e))

// axios响应式拦截器
httpInstance.interceptors.response.use(res => res.data, e => {
  //错误提示同意拦截
  const userStore=useUserStore()
  console.log(e)
  ElMessage({
    type:'warning',
    message:e.response.data.message
  })
  //相应拦截器处理
  //401token过期处理
  //清楚本地用户数据
  //跳转到登录页
  if(e.response.status === 401){
    userStore.deleteInfo()
    router.push('/login')
  }
  return Promise.reject(e)
})


export default httpInstance