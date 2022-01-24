//home模块小仓库
import { reqCategoryList } from '@/api';
//state：是仓库存储数据的地方
const state = {
    //state中数据的初始值按照接口返回的数据类型。
    categoryList: [],
};
//mutations:修改state唯一手段
const mutations = {
    CATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList;
    }
};
//action：处理action，书写业务逻辑，处理异步
const actions = {
    //这里可以书写业务逻辑，不能修改state
    //通过api接口函数调用，向服务器发请求，获取服务器数据
    async categoryList({ commit }) {
        let result = await reqCategoryList();
        // console.log(result);
        if (result.code == 200) {
            commit("CATEGORYLIST", result.data);
        }
    }
};
//getters：理解为计算属性，简化仓库数据，让组件获取数据更方便。
const getters = {};

export default {
    state,
    mutations,
    actions,
    getters
};