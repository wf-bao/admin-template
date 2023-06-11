import axiosReq from "../utils/request";

export const login = (data) => {
  return axiosReq({
    url: '/login/index',
    method: 'post',
    data,
    bfLoading: true
  })
}

export const getInfo = () => {
  return axiosReq({
    url: '/taxpayer/getList'
  })
}