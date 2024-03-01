import { getCategoryAPI } from '@/apis/category';
import { ref, onMounted,watch } from 'vue';
import { useRoute } from 'vue-router';

export const UseCategory =() => {
  const categoryData= ref({})
  const route=useRoute()
  const getCategory = async () => {
    const res = await getCategoryAPI(route.params.id)
    categoryData.value = res.result
  }
  onMounted(() => getCategory())
  // onUpdated(()=>getCategory())
  watch(()=>route.params.id,()=>{
    getCategory() 
  })
  return {
    categoryData
  }
}