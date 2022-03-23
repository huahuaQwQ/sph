//调用api模块
import { reqAddOrUpdateShopCart, reqGoodsInfo } from '@/api';
//封装游客身份模块uuid---生成一个随机字符串（不改变）
import { getUUID } from '@/utils/uuid_token';
const state = {
    goodInfo: {},
    //游客的临时身份
    uuid_token: getUUID()
};
const mutations = {
    GETGOODINFO(state, goodInfo) {
        state.goodInfo = goodInfo;
    }
};
const actions = {
    //获取产品数据的action,这个是派发的函数，用户点图片时，传递图片对应的id到这。{commit}用来把方法内的内容提交到mutations
    async getGoodInfo({ commit }, skuId) {
        let result = await reqGoodsInfo(skuId)
        if (result.code == 200) {
            commit('GETGOODINFO', result.data);
        }
    },
    //将产品添加到购物车 || 修改某个产品个数
    async AddOrUpdateShopCart({ commit }, { skuId, skuNum }) {
        /**
         * 加入购物车以后（发请求），前台将参数带给服务器
         * 服务器写入数据成功，并不会返回其他数据，只是返回code=200，表示操作成功
         * 因为服务器没有返回其他数据，因此不需要三连环（mutation,state,getters）存储数据
         */
        let result = await reqAddOrUpdateShopCart(skuId, skuNum);
        //当前这个函数如果执行返回的是promise
        //如果code==200代表加入购物车是成功，否则会将失败的结果返回给回调函数
        if (result.code == 200) {
            return 'ok'
        } else {
            //加入购物车失败
            return Promise.reject(new Error('faile'));
        }
    }
};
//简化数据
const getters = {
    //简化路径导航数据
    categoryView(state) {
        //state.goodInfo初始化是一个空对象，空对象的categoryView属性值是undefined
        //所以，当前计算出categoryView至少是一个空对象，这样就不会报错
        return state.goodInfo.categoryView || {};
    },
    //简化产品信息数据
    skuInfo(state) {
        return state.goodInfo.skuInfo || {};
    },
    //简化产品售卖属性数据
    spuSaleAttrList(state) {
        return state.goodInfo.spuSaleAttrList || [];
    }
};
export default {
    state,
    mutations,
    actions,
    getters
};