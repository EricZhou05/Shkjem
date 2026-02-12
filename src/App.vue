<template>
  <div id="app">
    <el-container>
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
  font-family: "Source Han Sans CN", "PingFang SC", "Microsoft YaHei", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.el-main {
  padding: 0 !important;
  /* 占满全屏 */
  height: 100vh; 
  overflow: hidden;
}
</style>