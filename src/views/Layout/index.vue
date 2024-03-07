<script setup>
import LayoutNav from './components/LayoutNav.vue'
import LayoutHeader from './components/LayoutHeader.vue'
import LayoutFooter from './components/LayoutFooter.vue'
import LayoutFixed from './components/LayoutFixed.vue'

import { useCategoryStore } from '@/store/category'
import { onMounted } from 'vue'

const categoryStore = useCategoryStore()

onMounted(() => {
  categoryStore.getCategory()
})

</script>

<template>
  <LayoutFixed />
  <LayoutNav />
  <LayoutHeader />
  <!-- tianjiakey，破坏复用机制，强制销毁重建 -->
  <!-- 或者可以采取watch监听 -->
  <!-- <RouterView :key="$route.fullPath"></RouterView> -->
  <RouterView />
  <LayoutFooter />
</template>