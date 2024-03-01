import { getBannerAPI } from '@/apis/home'
import {ref, onMounted} from 'vue'

// import { ref } from 'vue'



export  const UseBanner= ()=> {
  const bannerList=ref([])
  const Banner= async ()=> {
    const res = await getBannerAPI({
    })
    console.log(res)
    bannerList.value=res.result
  }
  onMounted(()=>{
    Banner()
  })
  return {
    bannerList
  }
}

