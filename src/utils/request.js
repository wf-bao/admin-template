/*工具函数层*/

// 引入axios
import axios from "axios";
import { ElMessage } from 'element-plus'
import router from '@/router'
import { userStore } from "../store/userStore";

const instance = axios.create({
    baseURL: '/api',    // 默认请求地址
    timeout: 10000   // 默认超时时间
})

// 请求拦截器 携带统一参数
instance.interceptors.request.use(config => {
    const token = localStorage.getItem('t_k')
    config.headers.token = token
    config.headers["Content-Type"] = 'application/x-www-form-urlencoded'
    return config
}, err => {
    return Promise.reject(err)
})

// 响应拦截器 处理状态码
instance.interceptors.response.use(response => {
    let { code, msg } = response.data
    if (code === 1000) {
        if (response.config.bfLoading) {
            ElMessage.success(msg)
        }
    } else if (code === 404) {
        ElMessage.error(msg)
    } else if (code === 1001) {
        ElMessage.error(msg)
    } else if (code === 1007) {
        ElMessage.error(msg)
        userStore().$reset()
        userStore().signOut()
        router.push('/login')
    }
    return response
}, err => {
    let { status } = err.response
    switch (status) {
        case 0:
            ElMessage.error('网络错误')
            break;
        case 401:
            router.push('/login')
            userStore().$reset()
            userStore().signOut()
            ElMessage.error('用户没有权限')
            break;
        case 404:
            ElMessage.error('404 not Found')
            break;
        case 500:
            router.push('/login')
            userStore().$reset()
            userStore().signOut()
            ElMessage.error(err.msg)
            break;
        default:
            break;
    }
    return Promise.reject(err)
})

// 创建一个axios函数 用于携带统一参数
const axiosReq = ({ url, method, data, params, bfLoading }) => {
    return instance({
        url,
        method: method || 'get',
        data,
        params,
        bfLoading: bfLoading || false
    })
}

// 导出axios函数
export default axiosReq

