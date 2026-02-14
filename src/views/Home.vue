<template>
  <div class="home">
    <!-- 悬浮 Header -->
    <header class="header-nav">
      <div class="logo">
        <img src="@/assets/img/toplogo.png" alt="logo" />
      </div>
      <el-menu
        :default-active="activeMenuIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
      >
        <el-menu-item index="0">首页</el-menu-item>
        <el-menu-item index="1">核心愿景</el-menu-item>
        <el-menu-item index="2">联系我们</el-menu-item>
      </el-menu>
    </header>

    <swiper
      :direction="'vertical'"
      :slidesPerView="'auto'"
      :mousewheel="true"
      :modules="modules"
      class="mySwiper"
      :style="{ height: swiperHeight + 'px' }"
      @swiper="onSwiper"
      @slideChange="onSlideChange"
    >
      <!-- 第一页：品牌形象 -->
      <swiper-slide class="swiper-slide main-slide slide-brand">
        <!-- 背景层 -->
        <div class="bg-layer" :style="{ backgroundImage: 'url(' + imgHomeTop + ')' }"></div>
        <!-- 压暗蒙版 -->
        <div class="mask-layer"></div>
        <!-- 内容层 -->
        <div class="content-layer">
          <h1 class="main-title fade-in-up">中山市盛裕科技有限公司</h1>
          <h2 class="sub-title fade-in-up delay-200">智汇盛世 · 裕见未来</h2>
        </div>
      </swiper-slide>
      
      <!-- 第二页：企业愿景 -->
      <swiper-slide class="swiper-slide main-slide slide-vision">
        <div class="bg-layer" :style="{ backgroundImage: 'url(' + imgBgTop + ')' }"></div>
        <div class="mask-layer-light"></div>
        <div class="vision-container">
          <!-- 模块 1 -->
          <div class="vision-card">
            <el-icon class="vision-icon"><Cpu /></el-icon>
            <h3>技术驱动 <span class="en">TECHNOLOGY</span></h3>
            <p>探索科技边界，赋能产业升级</p>
          </div>
          <!-- 模块 2 -->
          <div class="vision-card">
            <el-icon class="vision-icon"><Service /></el-icon>
            <h3>热忱服务 <span class="en">CONSULTING</span></h3>
            <p>专业的视角，为您提供深度解决方案</p>
          </div>
          <!-- 模块 3 -->
          <div class="vision-card">
            <el-icon class="vision-icon"><TrendCharts /></el-icon>
            <h3>持续创新 <span class="en">INNOVATION</span></h3>
            <p>追求卓越，与客户共同成长</p>
          </div>
        </div>
      </swiper-slide>

      <!-- 第三页：联系我们 -->
      <swiper-slide class="swiper-slide main-slide slide-contact">
        <div class="contact-wrapper">
          <div class="contact-left">
            <div class="contact-content">
              <h2>CONTACT US</h2>
              <h3>中山市盛裕科技有限公司</h3>
              <p class="en-name">Zhongshan Shengyu Technology Co., Ltd.</p>
              <div class="info-item">
                <span class="label">地址 / Add</span>
                <span class="val">广东省中山市东区长江路33号五层05号房A05卡</span>
              </div>
              <div class="info-item">
                <span class="label">邮箱 / Email</span>
                <span class="val">duanxiaoling@xiao100.com</span>
              </div>
            </div>
          </div>
          <div class="contact-right" :style="{ backgroundImage: 'url(' + imgHomeAnli + ')' }">
            <div class="overlay"></div>
          </div>
        </div>
      </swiper-slide>

      <!-- Footer -->
      <swiper-slide class="swiper-slide footer-slide">
        <div class="footer-container">
          <p class="copyright">Copyright © 2021 - 2026 中山市盛裕科技有限公司 版权所有</p>
          <div class="beian-info">
            <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer">粤ICP备2026018457号</a>
            <span class="divider">|</span>
            <span class="police-beian">粤公网安备 44030002xxxxxx号</span>
          </div>
        </div>
      </swiper-slide>
    </swiper>

    <!-- 极简下滑引导箭头 (全局) -->
    <div class="scroll-guide" v-show="showArrow" @click="slideToNext">
      <div class="arrow"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Mousewheel } from 'swiper/modules'
import { Monitor, Cpu, Service, TrendCharts } from '@element-plus/icons-vue'

// Import Assets
import imgHomeTop from '@/assets/img/home_top.jpg'
import imgBgTop from '@/assets/img/bgtop.jpg'
import imgHomeAnli from '@/assets/img/home_anli.jpg'

// Import Swiper styles
import 'swiper/css'

const { proxy } = getCurrentInstance()
const imgserver = proxy.imgserver

const modules = [Mousewheel]
const swiperHeight = ref(window.innerHeight)
const swiperInstance = ref(null)
const activeMenuIndex = ref('0')
const showArrow = ref(true)

// Swiper 初始化回调
const onSwiper = (swiper) => {
  swiperInstance.value = swiper
}

// 页面切换回调，同步更新菜单高亮
const onSlideChange = (swiper) => {
  // Footer 是第 3 页 (index 3)，但菜单只有 0, 1, 2
  // 如果滑到 footer，保持在 "联系我们" 高亮
  const index = swiper.activeIndex > 2 ? 2 : swiper.activeIndex
  activeMenuIndex.value = index.toString()
  
  // 仅第一、二页显示箭头 (Index 0, 1)
  showArrow.value = swiper.activeIndex < 2
}

// 箭头点击回调
const slideToNext = () => {
  if (swiperInstance.value) {
    swiperInstance.value.slideNext()
  }
}

// 菜单点击回调，控制 Swiper 跳转
const handleSelect = (key) => {
  if (swiperInstance.value) {
    swiperInstance.value.slideTo(parseInt(key))
  }
}

// 响应式调整高度
onMounted(() => {
  window.addEventListener('resize', () => {
    swiperHeight.value = window.innerHeight
  })
})
</script>

<style lang="scss" scoped>
/* 全局基础设置 */
.home {
  font-family: "Source Han Sans CN", "PingFang SC", "Microsoft YaHei", sans-serif;
  color: #fff;
  position: relative;
  height: 100vh;
  width: 100%;
}

/* Header 悬浮样式 */
.header-nav {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  z-index: 100;
  background: linear-gradient(to bottom, rgba(0,0,0,0.8), rgba(0,0,0,0));
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 50px;
  box-sizing: border-box;

  opacity: 0;
  transform: translateY(-100%);
  animation: headerSlideDown 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
  animation-delay: 0.5s;

  .logo {
    width: 200px;
    height: 100%;
    display: flex;
    align-items: center;
    
    img {
      max-height: 50px;
      display: block;
    }
  }

  .el-menu-demo {
    background-color: transparent !important;
    border-bottom: none !important;
    width: 400px; /* 限制宽度 */
    display: flex;
    justify-content: flex-end;
    
    .el-menu-item {
      background-color: transparent !important;
      color: rgba(255, 255, 255, 0.7) !important;
      font-size: 16px;
      font-weight: 300;
      padding: 0 20px;
      
      &:hover, &.is-active {
        color: #fff !important;
        font-weight: 500;
        
        &::after {
          content: '';
          position: absolute;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          width: 20px;
          height: 2px;
          background-color: #E0C38C;
        }
      }
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

/* Swiper 样式 */
.mySwiper {
  width: 100%;
}

.swiper-slide {
  position: relative;
  overflow: hidden;
  
  &.main-slide {
    height: 100% !important;
  }
}

/* 通用背景层 */
.bg-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  z-index: 1;
}

/* 蒙版层与动画 */
.mask-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* 加深压暗程度 */
  z-index: 2;
  opacity: 0;
  animation: maskFadeIn 1s ease-out forwards;
  animation-delay: 1s;
}

.mask-layer-light {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  z-index: 2;
}

@keyframes maskFadeIn {
  to { opacity: 1; }
}

/* 动画工具类 */
.fade-in-up {
  opacity: 0;
  transform: translateY(30px);
  animation: fadeInUp 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
}

.delay-200 { animation-delay: 0.2s; }
.delay-400 { animation-delay: 0.4s; }

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 第一页：品牌形象 */
.slide-brand {
  .content-layer {
    position: relative;
    z-index: 3;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  .main-title {
    font-size: 64px;
    font-weight: 700;
    letter-spacing: 4px;
    margin-bottom: 20px;
    text-shadow: 0 10px 30px rgba(0,0,0,0.3);
  }

  .sub-title {
    font-size: 24px;
    font-weight: 300;
    letter-spacing: 12px;
    color: #E0C38C; /* 淡金色 */
    text-shadow: 0 5px 15px rgba(0,0,0,0.3);
  }
}

/* 下滑引导动画 - 全局 */
.scroll-guide {
  position: absolute;
  bottom: 6%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 90; /* 确保在 Swiper 之上 */
  opacity: 0;
  animation: guideFadeIn 1s ease-out 1.5s forwards;
  cursor: pointer;
  transition: opacity 0.5s; /* 显隐过渡 */

  .arrow {
    width: 20px;
    height: 20px;
    border-right: 2px solid #E0C38C;
    border-bottom: 2px solid #E0C38C;
    transform: rotate(45deg);
    animation: arrowSlide 2s infinite;
    box-sizing: border-box;
  }
}

@keyframes guideFadeIn {
  to { opacity: 1; }
}

@keyframes arrowSlide {
  0% {
    transform: rotate(45deg) translate(-5px, -5px);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: rotate(45deg) translate(5px, 5px);
    opacity: 0;
  }
}

/* 第二页：企业愿景 */
.slide-vision {
  .vision-container {
    position: relative;
    z-index: 3;
    height: 100%;
    width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  /* 初始状态：隐藏且下沉 */
  .vision-card {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 0 20px;
    
    opacity: 0;
    transform: translateY(50px); /* 加大位移 */
    transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);

    &:hover {
      /* 暂时移除 hover 位移，避免混淆 */
      
      .vision-icon {
        color: #E0C38C;
        transform: scale(1.1);
      }
    }

    .vision-icon {
      font-size: 48px;
      margin-bottom: 30px;
      transition: all 0.3s ease;
    }

    h3 {
      font-size: 24px;
      font-weight: 600;
      margin-bottom: 15px;
      
      .en {
        display: block;
        font-size: 12px;
        font-weight: 400;
        letter-spacing: 2px;
        margin-top: 5px;
        opacity: 0.6;
      }
    }

    p {
      font-size: 16px;
      font-weight: 300;
      line-height: 1.6;
      opacity: 0.8;
      max-width: 280px;
    }
  }

  /* 激活状态：依次浮现 */
  &.swiper-slide-active .vision-card {
    opacity: 1;
    transform: translateY(0);
    
    &:nth-child(2) { transition-delay: 0.2s; }
    &:nth-child(3) { transition-delay: 0.4s; }
  }
}

/* 第三页：联系我们 */
.slide-contact {
  background-color: #0f1c2e;

  .contact-wrapper {
    display: flex;
    width: 100%;
    height: 100%;
    overflow: hidden; /* 防止动画溢出 */
  }

  .contact-left {
    width: 0;
    opacity: 0;
    background-color: #0f1c2e;
    display: flex;
    justify-content: center; /* 居中内容 */
    align-items: center;
    overflow: hidden;
    white-space: nowrap;
    
    /* 移除延迟，增加时长至 1.8s */
    transition: all 2s cubic-bezier(0.16, 1, 0.3, 1);
  }

  /* 当 Slide 激活时 */
  &.swiper-slide-active .contact-left {
    width: 50%;
    opacity: 1;
  }

  &.swiper-slide-active .contact-content {
    h2, h3, .en-name, .info-item {
      opacity: 1;
      /* 移除 transform */
    }
  }

  .contact-content {
    width: 100%;
    max-width: 600px;
    min-width: 600px; /* 核心修复：固定最小宽度，防止换行跳动 */
    padding: 0 35px;
    box-sizing: border-box;

    h2, h3, .en-name, .info-item {
      opacity: 0;
      /* 移除 transform，只保留透明度渐变 */
      transition: opacity 1.8s cubic-bezier(0.16, 1, 0.3, 1);
    }

    h2 {
      font-size: 80px;
      font-weight: 900;
      color: rgba(255,255,255,0.05);
      margin-bottom: -40px;
      margin-left: -5px;
    }

    h3 {
      font-size: 32px;
      font-weight: 600;
      margin-bottom: 10px;
      white-space: normal;
    }

    .en-name {
      font-size: 14px;
      letter-spacing: 1px;
      opacity: 0.5;
      margin-bottom: 60px;
      text-transform: uppercase;
      white-space: normal;
    }

    .info-item {
      margin-bottom: 30px;
      display: flex;
      flex-direction: column;

      .label {
        font-size: 12px;
        color: #E0C38C;
        margin-bottom: 8px;
        text-transform: uppercase;
        letter-spacing: 1px;
      }

      .val {
        font-size: 18px;
        font-weight: 300;
        letter-spacing: 1px;
        white-space: normal;
      }
    }
  }

  .contact-right {
    flex: 1;
    background-position: center;
    background-size: cover;
    position: relative;
    /* 移除延迟，增加时长 */
    transition: all 1.8s cubic-bezier(0.16, 1, 0.3, 1);
    
    .overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.6);
    }
  }
}

/* Footer (保持之前的样式) */
.footer-slide {
  height: auto !important;
  background-color: #0f1c2e;
  color: #fff;
  padding: 15px 0;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Microsoft YaHei", Arial, sans-serif;
  box-shadow: inset 0 4px 6px -1px rgba(0, 0, 0, 0.15);
  position: relative;
  z-index: 10;
  
  .footer-container {
    width: 100%;
    text-align: center;

    .copyright {
      color: rgba(255, 255, 255, 0.9);
      font-size: 12px;
      font-weight: 400;
      margin-bottom: 5px;
    }
    
    .beian-info {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 15px;
      font-size: 12px;
      flex-wrap: wrap;
      
      a {
        color: rgba(255, 255, 255, 0.8);
        text-decoration: none;
        transition: all 0.3s ease;
        display: inline-block;

        &:hover {
          color: #fff;
          transform: translateY(-2px);
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
      }

      span {
        color: rgba(255, 255, 255, 0.8);
      }
      
      .divider {
        color: rgba(255, 255, 255, 0.4);
      }
    }
  }
}

/* 移动端适配 */
@media (max-width: 768px) {
  /* Header 适配 */
  .header-nav {
    padding: 0 20px;
    height: 60px;
    
    .logo {
      width: 120px;
      img {
        max-height: 35px;
      }
    }

    .el-menu-demo {
      width: 60px;
      flex: none;
      justify-content: flex-end;
      
      .el-menu-item {
        padding: 0 10px;
        font-size: 14px;
        
        &:hover, &.is-active {
          &::after {
            bottom: 15px;
            width: 15px;
          }
        }
      }
    }
  }

  /* 第一页适配 */
  .slide-brand {
    .main-title {
      font-size: 8.5vw; /* 使用视口宽度单位实现等比例缩放 */
      letter-spacing: 2px;
      padding: 0 10px;
      white-space: nowrap; /* 强制不换行 */
    }

    .sub-title {
      font-size: 3.5vw;
      letter-spacing: 4px;
      white-space: nowrap; /* 强制不换行 */
    }
  }

  /* 第二页适配 */
  .slide-vision {
    .vision-container {
      width: 100%;
      flex-direction: column;
      justify-content: center;
      padding: 80px 20px 20px;
      box-sizing: border-box;
    }

    .vision-card {
      margin-bottom: 30px;
      transform: translateY(30px);

      .vision-icon {
        font-size: 36px;
        margin-bottom: 15px;
      }

      h3 {
        font-size: 18px;
        margin-bottom: 8px;
      }

      p {
        font-size: 14px;
        max-width: 100%;
      }
    }
  }

  /* 第三页适配 */
  .slide-contact {
    .contact-wrapper {
      flex-direction: column;
    }

    .contact-left {
      width: 100% !important;
      height: 60%;
      padding-top: 60px;
    }

    .contact-right {
      width: 100%;
      height: 40%;
    }

    &.swiper-slide-active .contact-left {
      width: 100% !important;
    }

    .contact-content {
      min-width: unset;
      max-width: 100%;
      padding: 0 30px;

      h2 {
        font-size: 40px;
        margin-bottom: -20px;
      }

      h3 {
        font-size: 20px;
        white-space: normal;
      }

      .en-name {
        font-size: 12px;
        margin-bottom: 30px;
      }

      .info-item {
        margin-bottom: 15px;

        .val {
          font-size: 14px;
        }
      }
    }
  }

  /* Footer 适配 */
  .footer-slide {
    padding: 20px 10px;
    
    .footer-container {
      .beian-info {
        gap: 5px;
        flex-direction: column;
        
        .divider {
          display: none;
        }
      }
    }
  }
}
</style>
