//封装倒计时逻辑函数
import {onUnmounted} from 'vue'
import {ref,computed} from 'vue'
import dayjs from 'dayjs'
export const useCountDown = () => {
  //1.响应式数据
  const timer = ref(null)
  const time = ref(0)
  //格式化时间
  const formTime = computed(()=>{
   return dayjs.unix(time.value).format('mm分ss秒')
  })
  //2.开启倒计时函数
  const start= (currentTime) => {
    //开启倒计时逻辑
    time.value = currentTime
    setInterval(() => {
      time.value--
    }, 1000)
  }
  //组件销毁时清楚定时器
  onUnmounted(() =>{
    timer.value && clearInterval(timer.value)
  })

  // 组件销毁时清楚定时器
  return {
    formTime,
    time,
    start
  }
}