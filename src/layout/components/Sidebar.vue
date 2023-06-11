<template>
    <div class="sidebar">
        <el-menu class="side-nav-bar" :router="true" :collapse="sidebarOpened" background-color="#001529" text-color="#fff"
            :unique-opened="true" active-text-color="#ffd04b" :default-active="$route.fullPath">
            <el-menu-item index="/home">
                <template #title>
                    <span>首页</span>
                </template>
            </el-menu-item>
            <!-- 开票管理 -->
            <el-sub-menu index="/invoice">
                <template #title>
                    <el-icon><Printer /></el-icon>
                    <span>开票管理</span>
                </template>
                <el-menu-item index="/invoice/invoice">发票开具</el-menu-item>
                <el-menu-item index="/invoice/invoice-code">生成开票二维码</el-menu-item>
                <el-menu-item index="/invoice/invoice-enabled">待开列表</el-menu-item>
                <el-menu-item index="/invoice/invoice-batch">批量开票</el-menu-item>
                <el-menu-item index="/invoice/invoice-record">批量开票记录</el-menu-item>
                <el-menu-item index="/invoice/invoice-blunt">发票冲红</el-menu-item>
            </el-sub-menu>
            <!-- 查询统计 -->
            <el-sub-menu index="/query">
                <template #title>
                    <el-icon><PieChart /></el-icon>
                    <span>查询统计</span>
                </template>
                <el-menu-item index="/query/query-order">订单查询</el-menu-item>
                <el-menu-item index="/query/query-invoice">发票查询</el-menu-item>
                <el-menu-item index="/query/summary">汇总统计</el-menu-item>
            </el-sub-menu>
            <!-- 税务管理 -->
            <el-sub-menu index="/taxation/tax-information">
                <template #title>
                    <el-icon><MessageBox /></el-icon>
                    <span>税务管理</span>
                </template>
                <el-menu-item index="/taxation/tax-information">税控信息</el-menu-item>
                <el-menu-item index="/taxation/upload-report">上传抄报</el-menu-item>
                <el-menu-item index="/taxation/invoice-inventory">发票库存</el-menu-item>
                <el-menu-item index="/taxation/void">空白作废</el-menu-item>
            </el-sub-menu>
            <!-- 常用设置 -->
            <el-sub-menu index="/setting">
                <template #title>
                    <el-icon><Setting /></el-icon>
                    <span>常用设置</span>
                </template>
                <el-menu-item index="/setting/buyer-information">购方信息</el-menu-item>
                <el-menu-item index="/setting/seller-information">销方信息</el-menu-item>
                <el-menu-item index="/setting/commodity-information">商品信息</el-menu-item>
            </el-sub-menu>
        </el-menu>
    </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { userStore } from '../../store/userStore.js';
import { useRoute } from 'vue-router';

const $route = useRoute()
const store = userStore()

const { sidebarOpened } = storeToRefs(store)


</script>

<style lang="less" scoped>
.sidebar {
    background: #001529;

    .side-nav-bar:not(.el-menu--collapse) {
        width: 210px;
    }

    .header {
        display: flex;
        color: #fff;
        align-items: center;
        justify-content: space-evenly;
        border-bottom: #fff solid 1px;
        padding: 10px 30px;

        img {
            width: 50px;
        }
    }

    .el-menu {
        border-right: 0;
    }

    .el-menu--inline {
        .el-menu-item {
            background: darken(#001529, 5%);

            &:hover {
                background: darken(#001529, 10%);
            }
        }
    }

    :deep(.el-sub-menu__title) {
        padding-right: 0;
    }
}
</style>