<template>
  <div class="common-layout">
    <el-container>
      <!-- 左侧导航 -->
      <el-aside width="auto">
        <Sidebar />
      </el-aside>
      <!-- 右侧 -->
      <el-container class="main-container">
        <!-- 头部 -->
        <el-header>
          <Navbar :key="$route.fullPath" />
        </el-header>
        <!-- 主体 -->
        <el-main>
          <el-card class="box-card">
            <app-main />
          </el-card>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import AppMain from "./components/AppMain.vue";
import Navbar from "./components/Navbar.vue";
import Sidebar from "./components/Sidebar.vue";
import { useRoute } from "vue-router";

const $route = useRoute();
</script>

<style lang="less" scoped>
.common-layout {
  height: 100%;

  .el-aside {
    background: #001529;
  }

  .main-container {
    height: 100vh;

    .el-header {
      padding: 0;
      height: auto;
    }

    .el-main {
      background: rgb(247, 249, 251);

      .box-card {
        height: 99%;
      }
    }
  }
}
</style>