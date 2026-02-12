<template>
  <div class="home" v-loading="loading">
    <swiper
      :direction="'vertical'"
      :slidesPerView="'auto'"
      :mousewheel="true"
      :pagination="{ clickable: true }"
      :modules="modules"
      class="mySwiper"
      :style="{ height: swiperHeight + 'px' }"
    >
      <swiper-slide class="swiper-slide slide-one main-slide">
        <div class="page">
          <h3>科建股份</h3>
          <p>KeJian Stock</p>
        </div>
        <p class="slogan">立人立己 达人达己</p>
      </swiper-slide>
      
      <swiper-slide class="swiper-slide slide-two main-slide">
        <div class="page">
          <h3>经典案例</h3>
          <p>Successful Case</p>
        </div>
        <ul class="case-item">
          <li
            v-for="(item, index) in caseList"
            :key="index"
            :style="{ backgroundImage: 'url(' + imgserver + item.Img + ')' }"
          >
            <div class="case-item-hover">
              <p class="hover-title">{{ item.Title }}</p>
              <div class="bottom"></div>
              <div class="more">
                <span>MORE</span>
              </div>
            </div>
          </li>
        </ul>
      </swiper-slide>

      <swiper-slide class="swiper-slide slide-three main-slide">
        <div class="page">
          <h3>最新资讯</h3>
          <p>Latest News</p>
        </div>
        <div class="news-content">
          <div class="news-content-item" v-for="(news, i) in newsList" :key="i">
            <div :style="'order: ' + (i % 2 == 0 ? 1 : 3)">
              <div class="item-img" :style="{ backgroundImage: 'url(' + imgserver + news.Img + ')' }"></div>
            </div>
            <div style="order: 2">
              <el-divider>
                <el-icon><Monitor /></el-icon>
              </el-divider>
            </div>
            <div class="item-content" :style="'order: ' + (i % 2 == 0 ? 3 : 1)">
              <h3>{{ news.Title }}</h3>
              <p>{{ news.Content }}</p>
              <span>{{ news.CreateTime }}</span>
            </div>
          </div>
        </div>
      </swiper-slide>

      <swiper-slide class="swiper-slide footer-slide">
        <div class="footer-container">
          <p class="copyright">Copyright © 2026 科建股份 版权所有</p>
          <div class="beian-info">
            <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer">粤ICP备2024000001号</a>
            <span class="divider">|</span>
            <span class="police-beian">粤公网安备 44030002000001号</span>
          </div>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Mousewheel, Pagination } from 'swiper/modules'
import { Monitor } from '@element-plus/icons-vue'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'

const { proxy } = getCurrentInstance()
const imgserver = proxy.imgserver
const $http = proxy.$http

const modules = [Mousewheel, Pagination]
const loading = ref(true)
const caseList = ref([])
const newsList = ref([])
const swiperHeight = ref(window.innerHeight - 60)

onMounted(async () => {
  try {
    const [responseCases, responseNews] = await Promise.all([
      $http.get("Cases/GetCasesAll"),
      $http.get("News?type=1&num=3")
    ])
    caseList.value = responseCases.data
    newsList.value = responseNews.data
  } catch (error) {
    console.error('Failed to fetch data:', error)
  } finally {
    loading.value = false
  }

  window.addEventListener('resize', () => {
    swiperHeight.value = window.innerHeight - 60
  })
})
</script>

<style lang="scss" scoped>
.mySwiper {
  width: 100%;
}

.swiper-slide {
  font-size: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  // 核心修改：主页面强制全高
  &.main-slide {
    height: 100% !important;
  }
}

.footer-slide {
  height: auto !important;
  background-color: #0161ad;
  color: #fff;
  padding: 15px 0; /* 保持紧凑高度 */
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Microsoft YaHei", Arial, sans-serif;
  
  /* 修改：极轻微的顶部内阴影，仅产生细腻的层级分界 */
  box-shadow: inset 0 4px 6px -1px rgba(0, 0, 0, 0.15);
  position: relative;
  z-index: 10;
  
  .footer-container {
    width: 100%;
    /* 移除毛玻璃背景相关样式 */
    text-align: center;

    .copyright {
      color: rgba(255, 255, 255, 0.9);
      font-size: 12px; /* 字体调小 */
      font-weight: 400;
      margin-bottom: 5px; /* 间距调小 */
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
        display: inline-block; /* 允许 transform 生效 */

        /* 仅超链接添加悬浮效果 */
        &:hover {
          color: #fff;
          transform: translateY(-2px); /* 上浮幅度微调 */
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

.page {
  text-align: center;
  height: 100px;
  h3,
  p {
    font-size: 40px;
    font-weight: 400;
    color: #fff;
  }
}

.slogan {
  text-align: center;
  font-size: 50px;
  color: #fff;
  padding: 30px 0;
}

.case-item {
  width: 1100px;
  height: 500px;
  overflow: hidden;
  margin: 30px auto 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  list-style: none;

  li {
    width: 330px;
    height: 250px;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    margin: 5px;
    position: relative;
    overflow: hidden;

    &:hover {
      .case-item-hover {
        opacity: 1;
        transition: all 0.4s ease-in-out;
      }
    }
  }
}

.case-item-hover {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  background-color: rgba(225, 56, 52, 0.7);
  text-align: center;

  .hover-title {
    height: 50px;
    color: #fff;
    font-size: 18px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-weight: 400;
    margin-top: 20px;
  }
  .bottom {
    border-bottom: 1px solid #fff;
    width: 60px;
    margin: 0 auto;
  }
  .more {
    width: 90px;
    padding: 5px;
    margin: 100px auto 0;
    border: 2px solid #fff;
    span {
      color: #fff;
      font-size: 20px;
    }
  }
}

.slide-one {
  background: url(../assets/img/home_top.jpg) no-repeat center;
  background-size: cover;
}
.slide-two {
  background: url(../assets/img/home_do.jpg) no-repeat center;
  background-size: cover;
}
.slide-three {
  background: url(../assets/img/home_anli.jpg) no-repeat center;
  background-size: cover;
}

.news-content {
  width: 1240px;
  margin: 40px auto 0;
  display: flex;
  justify-content: center;

  &-item {
    width: 400px;
    display: flex;
    flex-direction: column;

    .item-img {
      width: 360px;
      height: 230px;
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
      margin: 0 auto;
    }
    .el-divider {
      background-color: transparent;
      border-top: 3px solid #fff;
      margin: 20px 0;
      .el-icon {
        color: #fff;
        font-size: 20px;
      }
    }
    .item-content {
      width: 360px;
      height: 230px;
      margin: 0 auto;
      h3 {
        font-size: 22px;
        height: 30px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      p {
        font-size: 15px;
        height: 80px;
        overflow: hidden;
        margin: 10px 0;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 4;
        -webkit-box-orient: vertical;
        word-wrap: break-word;
      }
      span {
        display: block;
        font-size: 14px;
        text-align: end;
      }
      h3,
      p,
      span {
        color: #fff;
      }
    }
  }
}
</style>
