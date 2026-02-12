<template>
  <div id="app">
    <el-container>
      <el-header>
        <div class="logo">
          <img src="./assets/img/toplogo.png" alt="logo" />
        </div>
        <el-menu
          default-active="1"
          class="el-menu-demo"
          mode="horizontal"
        >
          <el-menu-item index="1">首页</el-menu-item>
        </el-menu>
      </el-header>
      <el-main>
        <Home />
      </el-main>
    </el-container>
  </div>
</template>

<script setup>
import Home from './views/Home.vue'
</script>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
}
html,
body {
  height: 100%;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

/* 隐藏 Header，实现全屏沉浸式 */
.el-header {
  display: none !important;
}

.el-main {
  padding: 0 !important;
  /* 占满全屏 */
  height: 100vh; 
  overflow: hidden;
}
</style>