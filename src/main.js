import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)

app.use(ElementPlus)

// 设置超时时间
axios.defaults.timeout = 5000
// 设置 api 地址
axios.defaults.baseURL = 'http://shkjgw.shkjem.com/api/'
app.config.globalProperties.$http = axios

// 图片服务器地址
app.config.globalProperties.imgserver = 'http://shkjgw.shkjem.com/'

app.mount('#app')
