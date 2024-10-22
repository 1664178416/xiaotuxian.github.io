

import { createApp } from 'vue'
import { createPinia} from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router'

//引入懒加载组件
import { lazyPlugin } from '@/directives'
//引入全局组件
import { componentPlugins } from '@/components'


//引入初始化样式文件
import '@/styles/common.scss'

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router)
app.use(lazyPlugin)
app.use(componentPlugins)
app.mount('#app')


//定义全局指令
// app.directive('img-lazy',{
//   mounted(el,binding){
//     //el是指令所绑定的元素
//     //binding是一个对象，binding.value 指令等号后面绑定的表达式的值，即图片url
//     console.log(el,binding.value)
//   }
// })