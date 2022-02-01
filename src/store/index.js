import Vue from 'vue';
import Vuex from 'vuex';
//使用插件一次
Vue.use(Vuex);
//引入小仓库
import home from './home.js';
import search from './search.js';

//对外暴露Store类的一个实例
export default new Vuex.Store({
    //实现Vuex仓库模块式开发存储数据
    modules:{
        home,
        search
    }
});