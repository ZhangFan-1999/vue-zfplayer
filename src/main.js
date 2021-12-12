// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import "../src/assets/index.css"
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import "../src/assets/iconfont/iconfont.css"
import "../node_modules/mint-ui/lib/style.css"
import "../node_modules/mint-ui/lib/index.js"
import store from "../src/store/index.js"
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import Video from 'video.js'
import 'video.js/dist/video-js.css'
import App from './App'
Vue.use(ElementUI);
Vue.prototype.$video = Video
// import 'lib-flexible'
import axios from "axios"
axios.interceptors.request.use(config => {
  // 使用axios请求数据时使用拦截器先调用NProgress
  NProgress.start()
  return config
})
// 在 response 拦截器中，隐藏进度条 NProgress.done()
axios.interceptors.response.use(config => {
  //在数据成功返回时结束NProgress 
  NProgress.done()
  return config
})
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  preLoad: 1.3,
  // error: require('./assets/loading.gif'),
  // loading: require('./assets/loading.gif'),
  attempt: 1
})
Vue.config.productionTip = false
axios.defaults.baseURL = "https://netease-cloud-music-api-eosin-iota.vercel.app/"
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
