//登录 注册模块
import { reqGetPhoneCode, reqUserRegister, reqUserLogin, reqUserInfo, reqLogout } from '@/api';
import { setToken, getToken, removeToken } from '@/utils/token';
//服务器邮箱发送
// import sendEmailCode from '@/fwq/emailsend';

const state = {
    phonecode: "",
    emailcode: "",
    token: getToken(), //获取token
    userInfo: {},
};
const mutations = {
    GETPHONECODE(state, phonecode) {
        state.phonecode = phonecode;
    },
    GETEMAILCODE(state, emailcode) {
        state.emailcode = emailcode;
    },
    USERLOGIN(state, token) {
        state.token = token;
    },
    GETUSERINFO(state, userInfo) {
        state.userInfo = userInfo;
    },
    //清除本地数据
    CLEAR(state) {
        //仓库中相关用户信息清空
        state.token = '';
        state.userInfo = {};
        //本地存储清空
        removeToken();
    }
};
const actions = {
    //获取手机验证码
    async getPhoneCode({ commit }, phone) {
        //正常情况，用户点获取手机验证码，把用户手机号发给服务器，服务器发验证码给用户
        let result = await reqGetPhoneCode(phone);
        if (result.code == 200) {
            //正常情况这里不用写，后端负责
            commit("GETPHONECODE", result.data);
            return "ok";
        } else {
            return Promise.reject(new Error("faile"));
        }
    },
    //获取邮箱验证码(未完成)
    async getEmailCode({ commit }, email) {
        let result = await sendEmailCode(email);
        if (result.code == 200) {
            //正常情况这里不用写，后端负责
            commit("GETEMAILCODE", result.data);
            return "ok";
        } else {
            return Promise.reject(new Error("faile"));
        }
    },
    //用户注册
    async userRegister({ commit }, user) {
        let result = await reqUserRegister(user);
        console.log(result);
        if (result.code == 200) {
            return "ok";
        } else {
            return Promise.reject(new Error("faile"));
        }
    },
    //用户登录
    async userLogin({ commit }, data) {
        let result = await reqUserLogin(data);
        // console.log(result);
        //服务器下发token，用户唯一标识符
        //将来通过带token找服务器要用户信息进行展示
        if (result.code == 200) {
            //提交用户token
            commit("USERLOGIN", result.data.token);
            //持久化存储token 本地存储localStorage
            // localStorage.setItem("TOKEN", result.data.token);
            //存储token
            setToken(result.data.token);
        } else {
            return Promise.reject(new Error("faile"));
        }
    },
    //获取用户信息
    async getUserInfo({ commit }) {
        let result = await reqUserInfo();
        // console.log(result);
        // console.log(result.data);
        if (result.code == 200) {
            //提交用户信息
            commit("GETUSERINFO", result.data);
            return 'ok';
        } else {
            return Promise.reject(new Error("faile"));
        }
    },
    //退出登录
    async userLogout({ commit }) {
        //只是向服务器发一次请求，通知服务器清除token
        let result = await reqLogout();
        if (result.code == 200) {
            //在action中不能操作state，所以必须commit提交到mutations修改state
            commit("CLEAR");
            return 'ok';
        } else {
            return Promise.reject(new Error('faile'));
        }
    }

};
const getters = {};
export default {
    state,
    mutations,
    actions,
    getters
}