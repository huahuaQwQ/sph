//home模块小仓库
import { reqCategoryList, reqGetBannerList, reqFloorList } from '@/api';
//state：是仓库存储数据的地方
const state = {
    //state中数据的初始值按照接口返回的数据类型。
    categoryList: [],
    //轮播图数据
    bannerList: [],
    //floor组件数据
    floorList: []
};
//mutations:修改state唯一手段
const mutations = {
    CATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList;
    },
    GETBANNERLIST(state, bannerList) {
        state.bannerList = bannerList;
    },
    GETFLOORLIST(state, floorList) {
        state.floorList = floorList;
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
    },
    //获取home首页轮播图数据
    async getBannerList({ commit }) {
        let result = await reqGetBannerList();
        // console.log(result);
        if (result.code == 200) {
            commit("GETBANNERLIST", result.data);
        }
    },
    //获取floor组件数据
    async getFloorList({ commit }) {
        let result = await reqFloorList();
        if (result.code == 200) {
            //提交mutation
            commit('GETFLOORLIST', result.data);
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