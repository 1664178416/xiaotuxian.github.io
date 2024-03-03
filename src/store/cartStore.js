import {defineStore} from 'pinia'
import {computed, ref} from 'vue'
import { useUserStore } from '@/store/user'
import { insertCartAPI,getCartListAPI,deleteCartAPI,mergeCartAPI} from '@/apis/cart'

export const useCartStore=defineStore('cart', ()=>{
    //1.定义state-cartList
    const cartList = ref([])
  const useStore=useUserStore()
  const isLogin=computed(()=>useStore.userInfo.token)
  //获取最新购物车列表
  const updateNewList = async()=>{
    const res=await getCartListAPI()
    cartList.value=res.result
  }
  const mergeCart = async () => {
    await mergeCartAPI(cartList.value.map(item=>{
      return {
        skuId:item.skuId,
        selected:item.selected,
        count:item.count
      }
    }))
    updateNewList()
  }

  //2.定义action
  const addCart = async (goods) =>{
    const {skuId,count}=goods
    //判断是否登录
    if(isLogin.value){
      await insertCartAPI({skuId,count})
      updateNewList()
      //这里不应该直接加，应该是在没登录的时候增加的数据登陆后同步到列表当中
      // cartList.value.push(res.result)
      //但是如下处理还有一个问题，本地加入的购物车并没有同步到接口当中，所以上面的insertCartAPI也得遍历调用，出于性能考虑，这里先不做处理
      // res.result.forEach(item=>{
      //   const idx=cartList.value.findIndex(cart=>item.skuId===cart.skuId)
      //   if(idx){
      //     cartList.value[idx].count++
      //   }
      //   else{
      //     cartList.value.push(item)
      //   }
      // })

      //破案了，在后端处理。。。
    }else{
    const item=cartList.value.find(item=>goods.skuId===item.skuId)
    if(item){
      item.count++
    }else{
      cartList.value.push(goods)
    }
    }
    // 添加购物车操作
    // 已添加过 - count + 1
    // 没有添加过 - 直接push
    // 思路：通过匹配传递过来的商品对象中的skuId能不能在cartList中找到，找到了就是添加过
    
  }
  //删除商品
  const delCart= async (skuId)=>{
    //同样要先判断是否登录
    if(isLogin.value){
      //调用接口实现购物车删除功能
      await deleteCartAPI(skuId)
      updateNewList()
    }else{
      //1.通过splice找到删除项的下标值
    const idx=cartList.value.findIndex(item=>skuId==item.skuId)
    cartList.value.splice(idx,1)
    //2.通过filter过滤删除
    cartList.value.filter(item=>item.skuId!==skuId)
    }
    
  }

  //清空购物车
  const clearCart=()=>{
    cartList.value=[]
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
    clearCart,
    cartCount,
    cartPrice,
    changeSelect,
    isAll,
    changeAll,
    SelectCount,
    SelectPrice,
    mergeCart,
    updateNewList
  }
},{
  persist:true
})