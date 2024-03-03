//封装购物车接口
import request from '@/utils/http'

//加入购物车
export const insertCartAPI = ({skuId,count})=>{
  return request({
    url: '/member/cart',
    method: 'post',
    data:{
      skuId,
      count
    }
  })
}

//获取购物车列表
export const getCartListAPI = ()=>{
  return request({
    url:'/member/cart'
  })
}

//删除购物车
export const deleteCartAPI = (skuId)=>{
  return request({
    url:'member/cart',
    method:'delete',
    data:{
      skuId
    }
  })
}

//合并购物车——交给后端处理。。。
export const mergeCartAPI = (data)=>{
  return request({
    url:'/member/cart/merge',
    method:'post',
    data
  })
}