import request from '@/utils/http'

export const getUserOrder = (params) => {
  return request({
    url: '/member/order',
    method: 'get',
    params
  })
}