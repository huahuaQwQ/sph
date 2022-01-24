import Vue from 'vue'
import App from './App.vue'
//三级联动组件---全局组件
import TypeNav from '@/components/TypeNav';
//第一个参数：全局组件的name，第二个参数：哪一个组件
Vue.component(TypeNav.name,TypeNav);
//引入路由组件
import router from '@/router'
Vue.config.productionTip = false
//引入仓库vuex
import store from '@/store';

new Vue({
  render: h => h(App),
  //注册路由
  //注册路由信息：这里写router，组件身上会有$route,$router属性
  router,
  //注册仓库:组件身上会多出现$store属性
  store
}).$mount('#app')
