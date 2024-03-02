import request from '@/utils/http'

export const loginAPI = ({account,password}) => {
  return request({
    url: '/login',
    method: 'post',
    data:{
      account,
      password
    }
  })
}