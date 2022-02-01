//进行axios二次封装
import axios from "axios";
//引入进度条
import nprogress from 'nprogress';
import  "nprogress/nprogress.css";
// console.log(nprogress);可以查看nprogress 有什么方法
//start：进度条开始     done：进度条结束
/**
 * 1.axios对象有create方法，创建一个axios实例
 * 2.request就是axios
 */
const requests = axios.create({
    //配置对象
    //基础路径，路径出现/api
    baseURL: "/mock",
    //表示请求超时时间5s
    timeout: 5000
});
//请求拦截器：发请求之前 做的事情
requests.interceptors.request.use((config) => {
    //config:配置对象，headers请求头很重要。
    //进度条开始活动
    nprogress.start();
    return config;
});
//响应拦截器：
requests.interceptors.response.use((res) => {
    //成功的回调：服务器响应数据返回后 做的事情
    //进度条结束
    nprogress.done();
    return res.data
}, (error) => {
    //响应失败的回调函数
    return Promise.reject(/* new Error('false') */error);
});

//对外暴露
export default requests;