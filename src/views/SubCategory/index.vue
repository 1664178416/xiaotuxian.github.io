<script setup>
import {getCategoryFilterAPI} from '@/apis/category'
import { ref, onMounted } from 'vue'
import  {useRoute} from 'vue-router'
import {getSubCategoryAPI} from '@/apis/category'
import GoodsItem from '../Home/components/GoodsItem.vue'

const categoryData=ref({})
const route=useRoute()
const getCategoryFilter=async()=>{
  const res=await getCategoryFilterAPI(route.params.id)
  categoryData.value=res.result
}
onMounted(()=>{
  getCategoryFilter()
})

const disabled=ref(false)

const goodList = ref([])
const reqData = ref({
  categoryId: route.params.id,
  page: 1,
  pageSize: 20,
  sortField: 'publishTime'
})
  
const getGoodList = async () => {
  const res = await getSubCategoryAPI(reqData.value)
  console.log(res)
  goodList.value = res.result.items
}
  
onMounted(() => getGoodList())

//tab切换
const tabChange = () => {
  console.log(reqData.value.sortField)
  getGoodList()
}

//加载更多
const load = async () => {
  console.log('加载更多')
  reqData.value.page++
  const res = await getSubCategoryAPI(reqData.value)
  // goodList.value = goodList.value.concat(res.result.items)
  goodList.value=[...goodList.value,...res.result.items]
  if(res.result.items.length==0){
    disabled.value=true
  }
}

</script>

<template>
  <div class="container ">
    <!-- 面包屑 -->
    <div class="bread-container">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: `/category/${categoryData.parentId}` }">{{categoryData.parentName}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{categoryData.name}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="sub-container">
      <el-tabs v-model="reqData.sortField" @tab-change="tabChange"
      :infinite-scroll-disabled="disabled">
        <el-tab-pane label="最新商品" name="publishTime"></el-tab-pane>
        <el-tab-pane label="最高人气" name="orderNum"></el-tab-pane>
        <el-tab-pane label="评论最多" name="evaluateNum"></el-tab-pane>
      </el-tabs>
      <div class="body" v-infinite-scroll="load">
         <!-- 商品列表-->
         <GoodsItem v-for="goods in goodList" :goods="goods" :key="goods.id"></GoodsItem>
      </div>
    </div>
  </div>

</template>



<style lang="scss" scoped>
.bread-container {
  padding: 25px 0;
  color: #666;
}

.sub-container {
  padding: 20px 10px;
  background-color: #fff;

  .body {
    display: flex;
    flex-wrap: wrap;
    padding: 0 10px;
  }

  .goods-item {
    display: block;
    width: 220px;
    margin-right: 20px;
    padding: 20px 30px;
    text-align: center;

    img {
      width: 160px;
      height: 160px;
    }

    p {
      padding-top: 10px;
    }

    .name {
      font-size: 16px;
    }

    .desc {
      color: #999;
      height: 29px;
    }

    .price {
      color: $priceColor;
      font-size: 20px;
    }
  }

  .pagination-container {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }


}
</style>