<template>
  <!-- 二级路由出口 -->
  <router-view v-slot="{ Component }">
    <transition name="fade-transform" mode="out-in">
      <keep-alive>
        <component :is="Component"></component>
      </keep-alive>
    </transition>
  </router-view>
</template>

<script setup>
</script>

<style lang="less" scoped>
.fade-transform-enter-active,
.fade-transform-leave-active {
  transition: all 0.5s ease 0s;
}

.fade-transform-enter {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>