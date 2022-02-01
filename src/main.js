import Vue from 'vue'
import App from './App.vue'

//引入Carousel轮播图全局组件
import Carousel from '@/components/Carousel';
//注册Carousel轮播图组件
Vue.component(Carousel.name,Carousel);

//引入三级联动组件---全局组件
import TypeNav from '@/components/TypeNav';
//注册三级联动组件，第一个参数：全局组件的name，第二个参数：哪一个组件
Vue.component(TypeNav.name,TypeNav);

//引入路由组件
import router from '@/router'
Vue.config.productionTip = false

//引入仓库vuex
import store from '@/store';

//引入mockServe.js--mock数据
import '@/mock/mockServe';

//引入swiper样式（css）
import 'swiper/css/swiper.css';


new Vue({
  render: h => h(App),
  //注册路由
  //注册路由信息：这里写router，组件身上会有$route,$router属性
  router,
  //注册仓库:组件身上会多出现$store属性
  store,

}).$mount('#app')
