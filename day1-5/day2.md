1.编程式路由跳转到当前路由时，多次执行跳转会抛出NavigationDuplicated警告错误？
路由跳转：声明式导航和编程式导航
声明式导航没有这个问题
1.1为什么编程式导航进行路由跳转时，会有这个警告呢？
"vue-router":"^3.5.3":最新的vue-router引入promise
1.2给push方法传递一个成功回调函数，一个失败回调函数，可以解决。promise需要一个成功或者失败的回调。

1.3可以使用下面代码，解决错误
this.$router.push({name:"search",params:{keyword:this.keyword||undefined},query:{k:this.keyword.toUpperCase()}},()=>{},()=>{})
但是这种写法：治标不治本。每次push|replace，都会有这样的警告。

1.4
this：当前组件实例vuecomponent(serach)
this.$router属性：属性值是VueRouter类的一个实例，在入口文件main.js中注册路由时，给组件实例添加$route,$router属性.
push:

function VueRouter(){}

//原型对象有push方法
VueRouter.prototype.push = function(){
    //这里的this是VueRouter的实例
}

创建VueRouter的实例
let $router = new VueRouter();

实例借用原型对象push方法
$router.push(xxx);


2.home模块组件
-静态页面完成
-拆分静态组件
-获取服务器数据展示
-动态业务

3.三级联动组件
home、search、detail把三级联动注册为全局组件

5.postman测试接口、
-如果服务器返回code字段是200，代表服务器返回数据成功
-整个项目接口前缀都有/api字样

6.axios二次封装
XMLHttpRequest、fetch、JQ、axios
6.1为什么需要进行二次封装axios？
请求拦截器和响应拦截器：
请求拦截器：在发请求之前处理业务
响应拦截器：当服务器返回数据以后，可以处理事情

6.2在项目里有API文件夹【axios】
接口路径都带有/api
baseURL："/api"

http://xxx.xxx:8080/api

7.接口的统一管理
项目小：在组件生命周期函数里发请求
项目大：组件100个，接口10个        axios.get('xxx')

7.1跨域问题
什么是跨域：协议、域名、端口号不同，请求时，称为跨域。
服务器和服务器没有跨域问题，服务器和浏览器有跨域问题。
例如：http://localhost:8080/api/product/getBaseCategoryList   localhost:8080是本机地址，没有api所以报错。
要使用http://39.98.123.211 地址请求api

解决方案：jsonp、cros、代理
在vue.config,js里，代理跨域
devServer: {
    proxy: {
        "/api": {
            target: "http://39.98.123.211",
            // pathRewrite: { "^/api": "" }   不需要路径重写，因为已经有/api了
        }
    }
}


8、 nprogress进度条使用
不但要引入nprogress，还要引入nprogress.css
start() 进度条开始，在请求开始的时候使用start() 
done() 进度条结束，在返回数据的以后是用done()

9.vuex状态管理库

9.1 vuex是什么？
vuex是官方提供的一个插件，状态管理库，集中式管理项目中组件共用的数据。（项目很大时使用）
state
mutations
actions
getters
modules

9.2vuex基本使用 【src下创建store文件夹index.js】

9.3 vuex模块式存储
大仓库存放n个小仓库（home/search/...），统一管理。

10: TypeNav三级联动展示数据业务
v-for="(元素,索引) in categoryList"
:key="categoryId"

