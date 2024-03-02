import {defineStore} from 'pinia'
import {computed, ref} from 'vue'

export const useCartStore=defineStore('cart', ()=>{
  //1.定义state-cartList
  const cartList = ref([])
  //2.定义action
  const addCart = (goods) =>{
    // 添加购物车操作
    // 已添加过 - count + 1
    // 没有添加过 - 直接push
    // 思路：通过匹配传递过来的商品对象中的skuId能不能在cartList中找到，找到了就是添加过
    const item=cartList.value.find(item=>goods.skuId===item.skuId)
    if(item){
      item.count++
    }else{
      cartList.value.push(goods)
    }
  }
  //删除商品
  const delCart=(skuId)=>{
    //1.通过splice找到删除项的下标值
    const idx=cartList.value.findIndex(item=>skuId==item.skuId)
    cartList.value.splice(idx,1)
    //2.通过filter过滤删除
    cartList.value.filter(item=>item.skuId!==skuId)
  }
  //统计数量
  const cartCount = computed(()=>{
    return cartList.value.reduce((sum,item)=>sum+item.count,0)
  })

  //统计总价
  const cartPrice = computed(()=>{
    return cartList.value.reduce((sum,item)=>sum+item.count*item.price,0)
  
  })

  //更改选择状态
  const changeSelect=(skuId)=>{
    const item=cartList.value.find(item=>skuId==item.skuId)
    item.selected=!item.selected
  }

  //定义计算属性用来判断是否全部选择
  const isAll=computed(()=>{
    return cartList.value.every(item=>item.selected)
  })
  //全选逻辑更改
  const changeAll=(flag)=>{
    cartList.value.forEach(item=>item.selected=flag)
  }
  //列表中已选择数量统计
  //reduce1后面回调可以使用大括号，但是要加return，且初值设置在大括号后，不加默认为0
  const SelectCount=computed(()=>{
    return cartList.value.reduce((sum,item)=>item.selected?sum+item.count:sum,0)
  })

  // 列表中选择商品总价
  const SelectPrice=computed(()=>{
    return cartList.value.filter(item=>item.selected).reduce((sum,item)=>{
      return sum+item.count*item.price
    },0)
  })
  return {
    cartList,
    addCart,
    delCart,
    cartCount,
    cartPrice,
    changeSelect,
    isAll,
    changeAll,
    SelectCount,
    SelectPrice
  }
},{
  persist:true
})