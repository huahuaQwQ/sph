//index.js配置路由的文件
import Vue from 'vue';
import VueRouter from 'vue-router';
//使用插件
Vue.use(VueRouter);
//引入路由组件
import Home from '@/pages/Home';
import Search from '@/pages/Search';
import Login from '@/pages/Login';
import Register from '@/pages/Register';

//把VueRouter原型对象的push方法保存一份
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
//重写push|replace方法
//第一个参数：告诉原来的push方法，你往哪里跳转（传递哪些参数）
//第二个参数：成功的回调
//第三个参数：失败的回调
//call和apply区别：
//相同点：可以调用函数一次，可以改变this指向对象
//不同点：call传递参数逗号隔开，apply是传递数组
VueRouter.prototype.push = function (localtion, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this, localtion, resolve, reject);
    } else {
        originPush.call(this, localtion, () => { }, () => { });
    }
}
VueRouter.prototype.replace = function (localtion, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, localtion, resolve, reject);
    } else {
        originReplace.call(this, localtion, () => { }, () => { });
    }
}

//配置路由
export default new VueRouter({
    //配置路由
    routes: [
        {
            path: "/home",
            component: Home,
            meta: { show: true }
        },
        {
            path: "/search/:keyword?",
            component: Search,
            meta: { show: true },
            name: "search",
            //路由组件能不能传递props数据?
            //布尔值写法:params
            // props:true,
            //对象写法:额外给路由组件传参
            // props:{a:1,b:2},
            //函数写法:可以把params参数和query参数传递给路由组件
            props: ($route) => ({ keyword: $route.params.keyword, k: $route.query.k })



        },
        {
            path: "/login",
            component: Login,
            meta: { show: false }
        },
        {
            path: "/register",
            component: Register,
            meta: { show: false }
        },
        //重定向，在项目跑起来时，访问/，立马定向到首页
        {
            path: "*",
            redirect: "/Home"
        }
    ]
})