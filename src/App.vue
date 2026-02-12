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

.el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 1240px;
  margin: 0 auto;
  height: 60px;

  .logo {
    width: 280px;
    padding: 10px;
    img {
      width: 100%;
      display: block;
    }
  }
}
.el-main {
  padding: 0 !important;
  /* 确保 main 区域占满剩余高度，由内部组件控制滚动 */
  height: calc(100vh - 60px); 
  overflow: hidden;
}
</style>