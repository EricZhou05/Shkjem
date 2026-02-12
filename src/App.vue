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
  font-family: "Source Han Sans CN", "PingFang SC", "Microsoft YaHei", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

/* Header 悬浮样式 */
.el-header {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px; /* 增加高度 */
  z-index: 100;
  background: linear-gradient(to bottom, rgba(0,0,0,0.8), rgba(0,0,0,0)); /* 渐变黑背景，增强文字可读性 */
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 50px; /* 两侧留白 */
  box-sizing: border-box;

  /* 初始隐藏状态，配合动画 */
  opacity: 0;
  transform: translateY(-100%);
  animation: headerSlideDown 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
  animation-delay: 0.5s; /* 稍微延迟，配合主页蒙版 */

  .logo {
    width: 200px;
    height: 100%;
    display: flex;
    align-items: center;
    
    img {
      max-height: 50px;
      display: block;
      /* 如果 logo 是深色的，可以加滤镜反白，或者让用户替换为白色 logo */
      /* filter: brightness(0) invert(1); */ 
    }
  }

  /* 透明菜单 */
  .el-menu-demo {
    background-color: transparent !important;
    border-bottom: none !important;
    
    .el-menu-item {
      background-color: transparent !important;
      color: rgba(255, 255, 255, 0.7) !important;
      font-size: 16px;
      font-weight: 300;
      
      &:hover, &.is-active {
        color: #fff !important;
        background-color: transparent !important;
        font-weight: 500;
        
        /* 简单的下划线动效 */
        &::after {
          content: '';
          position: absolute;
          bottom: 10px;
          left: 50%;
          transform: translateX(-50%);
          width: 20px;
          height: 2px;
          background-color: #E0C38C;
        }
      }
      
      /* 去掉 element-plus 默认的底部边框 */
      border-bottom: none !important; 
    }
  }
}

@keyframes headerSlideDown {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.el-main {
  padding: 0 !important;
  /* 占满全屏 */
  height: 100vh; 
  overflow: hidden;
}
</style>