import { createRouter, createWebHashHistory } from "vue-router";
import Layout from "@/Layout"
// import Login from "@/views/login/login.vue"

const routes = [{
        path: '/',
        redirect: '/home'
    },
    // 登录
    {
        path: '/login',
        name: 'Login',
        component: ()=> import('@/views/login/login.vue')
    },
    // 首页
    {
        path: '/home',
        component: Layout,
        children: [
            {
                path: '',
                component:()=> import('@/views/home/index.vue')
            }
        ]
    },
    // 开票管理
    {
        path: '/invoice',
        component: Layout,
        redirect: '/invoice/invoice',
        // meta: {
        //     keepAlive: true
        // },
        children: [
            {
                path: 'invoice',
                name: '发票开具',
                component:()=> import('@/views/invoice/invoice.vue')
            },
            {
                path: 'invoice-code',
                name: '生成开票二维码',
                component:()=> import('@/views/invoice/invoice-code.vue')
            },
            {
                path: 'invoice-enabled',
                name: '待开列表',
                component:()=> import('@/views/invoice/invoice-enabled.vue')
            },
            {
                path: 'invoice-batch',
                name: '批量开票',
                component:()=> import('@/views/invoice/invoice-batch.vue')
            },
            {
                path: 'invoice-record',
                name: '批量开票记录',
                component:()=> import('@/views/invoice/invoice-record.vue')
            },
            {
                path: 'invoice-blunt',
                name: '发票冲红',
                component:()=> import('@/views/invoice/invoice-blunt.vue')
            }
        ]
    },
    // 查询统计
    {
        path: '/query',
        component: Layout,
        redirect: '/query/query-order',
        children: [
            {
                path: 'query-order',
                name: '订单查询',
                component:()=> import('@/views/query/query-order.vue')
            },
            {
                path: 'query-invoice',
                name: '发票查询',
                component:()=> import('@/views/query/query-invoice.vue')
            },
            {
                path: 'summary',
                name: '汇总统计',
                component:()=> import('@/views/query/summary.vue')
            }
        ]
    },
    // 税务管理
    {
        path: '/taxation',
        component: Layout,
        redirect: '/taxation/tax-information',
        children: [
            {
                path: 'tax-information',
                name: '税控信息',
                component:()=> import('@/views/taxation/tax-information.vue')
            },
            {
                path: 'upload-report',
                name: '上传抄报',
                component:()=> import('@/views/taxation/upload-report.vue')
            },
            {
                path: 'invoice-inventory',
                name: '发票库存',
                component:()=> import('@/views/taxation/invoice-inventory.vue')
            },
            {
                path: 'void',
                name: '空白作废',
                component:()=> import('@/views/taxation/void.vue')
            }
        ]
    },
    // 常用设置
    {
        path: '/setting',
        component: Layout,
        redirect: '/setting/buyer-information',
        children: [
            {
                path: 'buyer-information',
                name: '购方信息',
                component:()=> import('@/views/setting/buyer-information.vue')
            },
            {
                path: 'seller-information',
                name: '销方信息',
                component:()=> import('@/views/setting/seller-information.vue')
            },
            {
                path: 'commodity-information',
                name: '商品信息',
                component:()=> import('@/views/setting/commodity-information.vue')
            }
        ]
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

// 路由全局前置守卫
router.beforeEach((to, from, next)=>{
    const token = localStorage.getItem('t_k')
    if (to.name !== 'Login' && !token) next({ name: 'Login' })
  else next()
})


export default router