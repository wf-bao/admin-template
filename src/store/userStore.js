import { defineStore } from "pinia";

export const userStore = defineStore('userStore', {
    state: () => {
        const t_k = ''
        return {
            sidebarOpened: false,
            user: {},
            tabList: [{ name: '首页', path: '/home' }],
        }
    },
    getters: {
    },
    actions: {
        toggleSidebar() {
            this.sidebarOpened = !this.sidebarOpened
        },
        // 保存token
        setToken(val) {
            this.t_k = val
            localStorage.setItem('t_k', val)
        },
        saveTab(tab) {
            if (this.tabList.findIndex((item) => item.path === tab.path) == -1) {
                this.tabList.push({ name: tab.name, path: tab.path })
            }
        },
        removeTab(tab) {
            let index = this.tabList.findIndex((item) => item.name === tab.name)
            this.tabList.splice(index, 1)
        },
        resetTab() {
            this.tabList = [{ name: '首页', path: '/home' }]
        },
        signOut() {
            localStorage.removeItem('t_k')
            localStorage.removeItem('user')
        }
    },
    // 开启缓存
    persist: {
        enabled: true,
        strategies: [
            {
                key: 'user',
                storage: localStorage
            }
        ]
    }
})