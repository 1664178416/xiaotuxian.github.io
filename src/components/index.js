// 把coponents中所有组件进行全局注册
import imageView from './imageView/index.vue'
import XtxSku from './XtxSku/index.vue'
export const componentPlugins = {  
  install(app){
    app.component('imageView',imageView)
    app.component('XtxSku',XtxSku)
  }
}