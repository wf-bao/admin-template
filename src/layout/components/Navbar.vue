<template>
    <div class="nav">
        <div class="nav_header">
            <el-icon size="20" :class="isFold" @click="test">
                <Expand />
            </el-icon>
            <!-- 头像 -->
            <div>
                <el-dropdown>
                    <span class="el-dropdown-link">
                        <el-icon size="25" class="el-icon--right">
                            <UserFilled />
                        </el-icon>
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item>修改密码</el-dropdown-item>
                            <el-dropdown-item @click="outLogin">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
        </div>
        <!-- 浏览记录 -->
        <div class="tabs_view_container">
            <div class="tabs_wrapper">
                <span :class="isActive(item)" v-for="item of tabList" :key="item.path" @click="goTo(item)">{{ item.name }}
                    <el-icon v-if="item.path != '/home'" @click.stop="rmTab(item)">
                        <Close />
                    </el-icon>
                </span>
            </div>
            <div class="tabs_close_item" @click="closeAllTab">全部关闭</div>
        </div>
    </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { userStore } from '../../store/userStore.js';
import { useRoute, useRouter } from 'vue-router';

const $route = useRoute()
const $router = useRouter()
const store = userStore()
const { sidebarOpened, tabList } = storeToRefs(store)
const test = () => {
    store.toggleSidebar()
}

// 浏览记录
const addTabList = () => {
    store.saveTab($route)
}
// 跳转
const goTo = (tab) => {
    $router.push({ path: tab.path })
}
// 删除记录
const rmTab = (tab) => {
    store.removeTab(tab)
    if (tab.path === $route.path) {
        $router.push({ path: tabList.value[tabList.value.length - 1].path })
    }
}
const closeAllTab = () => {
    store.resetTab()
    $router.push({ path: '/home' })
}
const outLogin = () => {
    store.$reset()
    store.signOut()
    $router.push({ path: '/login' })
}

const isFold = computed(() => {
    return sidebarOpened.value ? '' : 'open'
})

const isActive = computed(() => {
    return (tab) => {
        if (tab.path == $route.path) {
            return 'tabs-view-item-active'
        }
        return 'tabs-view-item'
    }
})

addTabList()
</script>

<style lang="less" scoped>
.nav {
    height: 100%;
    // display: flex;
    // align-items: center;
    // justify-content: space-between;

    .nav_header {
        padding: 0 30px 0 15px;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .open {
            transform: rotate(180deg);
        }
    }

    .tabs_view_container {
        padding: 0 30px 0 10px;
        height: 33px;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #d8dce5;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);

        .tabs_wrapper {
            overflow-x: auto;
            overflow-y: hidden;
            white-space: nowrap;
            width: 95%;

            .tabs-view-item {
                display: inline-block;
                cursor: pointer;
                height: 25px;
                line-height: 25px;
                border: 1px solid #d8dce5;
                color: #495060;
                background: #fff;
                padding: 0 8px;
                font-size: 12px;
                margin-top: 4px;
                margin-left: 5px;
            }

            .tabs-view-item-active {
                display: inline-block;
                cursor: pointer;
                height: 26px;
                line-height: 26px;
                padding: 0 8px;
                font-size: 12px;
                margin-top: 4px;
                margin-left: 5px;
                background-color: #42b983;
                color: #fff;
                border-color: #42b983;
            }

            .tabs-view-item-active:before {
                content: '';
                background: #fff;
                display: inline-block;
                width: 8px;
                height: 8px;
                border-radius: 50%;
                position: relative;
                margin-right: 2px;
            }
        }

        .tabs_close_item {
            position: absolute;
            right: 10px;
            display: inline-block;
            cursor: pointer;
            height: 25px;
            line-height: 25px;
            border: 1px solid #d8dce5;
            color: #495060;
            background: #fff;
            padding: 0 8px;
            font-size: 12px;
            margin-top: 4px;
            margin-left: 5px;
        }
    }

}

*::-webkit-scrollbar {
    width: 0.5rem;
    height: 6px;
}

*::-webkit-scrollbar-thumb {
    border-radius: 0.5rem;
    background-color: rgba(144, 147, 153, 0.3);
}
</style>