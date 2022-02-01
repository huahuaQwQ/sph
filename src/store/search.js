//search模块小仓库
import { reqGetSearchInfo } from '@/api'
//state：是仓库存储数据的地方
const state = {
    //初始化仓库状态
    searchList: {}
};
//mutations:修改state唯一手段
const mutations = {
    GETSEARCHLIST(state, searchList) {
        state.searchList = searchList;
    }
};
//action：处理action，书写业务逻辑，处理异步
const actions = {
    //这里可以书写业务逻辑，不能修改state
    //获取search组件数据
    async getSearchList({ commit },params={}) {
        //reqGetSearchInfo() 里面至少传递一个空对象
        //params形参：是当用户派发action时，dispatch（）第二个参数传递过来的，至少是一个空对象。
        let result = await reqGetSearchInfo(params);
        if (result.code == 200) {
            commit('GETSEARCHLIST', result.data);
        }
    }
};
//getters：计算属性，简化仓库数据，让组件获取数据更方便。
const getters = {
    //当前形参state，是当前仓库的state（search小仓库），并不是大仓库state！
    attrsList(state){
        //假如无网络state.searchList.attrsList返回的undefined ，undefined页面遍历不了
        return state.searchList.attrsList || [];
    },
    goodsList(state){
        return state.searchList.goodsList || [];
        
    },
    trademarkList(state){
        return state.searchList.trademarkList || [];
    }

};

export default {
    state,
    mutations,
    actions,
    getters
};