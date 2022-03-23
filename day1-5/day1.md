1:vue-cli脚手架初始化目录

mode_modules:项目依赖文件夹

public：静态资源文件夹，webpack打包时，会把它打包到dist文件夹中

src：源代码文件夹
    assets：静态资源文件夹，webpack打包时，会把它当成一个模块，打包到js文件里。
    components：非路由组件（全局组件）
    App.vue:根组件
    main.js：入口文件，最先执行的文件。

babel.config.js：配置文件（babel相关）

package.json:认为是项目的身份证，依赖、运行。

package-lock.json:缓存文件


2.1在serve 加入--open 每次npm run serve都会自动打开浏览器
"scripts": {
    "serve": "vue-cli-service serve --open",
    "build": "vue-cli-service build",
    "lint": "vue-cli-service lint"
  },

2.2 eslint校验关闭
--创建一个vue.config.js
module.exports = {
    //关闭eslint
    lintOnSave:false
}

2.3 src 简写方法，配置别名@
--创建jsconfig.json配置别名@提示   
【@代表的是src文件夹，不能在"node_modules","dist"文件夹中使用】
{
    "compilerOptions": {
        "baseUrl": "./",
        "paths": {
            "@/*":["src/*"]
        },
        
    },
    "exclude":["node_modules","dist"]
}

3：项目路由分析
key：URL（项目路由路径）
value：相应路由组件

路由组件：
home首页路由组件、search搜索路由组件、login登录路由、register注册
全局组件：
header【首页、搜索页】
footer【首页、搜索页】，登录/注册页没有


4：完成header和footer业务
开发时：
1.html和css
2.拆分组件
3.获取服务器动态展示
4.完成动态逻辑

注意1.组件结构 + 组件样式 + 图片资源
注意2.安装less 和less-loader@5
注意3.在style标签 加lang="less"

4.1使用组件（非路由组件）
1.创建或定义
2.引入inport
3.注册
4.标签形式使用

注意：在public的index.html中引入reset.css清除浏览器自带的默认样式

5路由组件的搭建
路由组件有四个：home、search、login、register
安装vue-router
--components文件夹：放非路由组件（全局组件）
--pages|views文件夹：放路由组件
5.1配置路由
放在src/router中，创建index.js配置路由

5.2总结
路由组件和非路由组件区别？
1.存放位置不一样；路由组件存放在pages|views文件夹，非路由组件存放在components文件夹
2.路由组件需要在router/index.js文件中注册（使用即为组件名字），非路由组件以标签方式使用
3.注册完路由组件，不管是路由组件还是非路由组件都有$route、$router属性

$route:获取路由信息【路径、query、params等等】
$router:编程式导航进行路由跳转【push、replace】

5.3路由跳转
两种形式：
1.声明式导航router-link，需要to属性，可以进行路由跳转。把a标签替换成router-link
2.编程式导航push|replace，可以进行路由跳转,在button标签加@click="方法"
编程式导航>声明式导航，编程式导航可以处理业务逻辑


6.footer组件显示和隐藏
v-if（操作dom，消耗性能）或v-show（比较好）
footer组件：在home和search是显示的
footer组件：在login和register是隐藏的

6.1可以判断组件的$route的path属性路径来判断显示和隐藏（弊端：组件很多很累）
6.2可以配置路由元信息[meta]，给$route添加属性meta的key-value字段，来判断显示和隐藏。
    在router/index.js中配置

8.路由传参
8.1 路由跳转有声明式导航和编程式导航
声明式导航：router-link，需要to属性，可以进行路由跳转
编程式导航：组件实例的$route.push|replace方法，可以实现路由跳转。（业务逻辑）
8.2 路由传参，参数有几种写法？
params参数：是路径的一部分，配置路由时，需要占位
query参数：不属于路径，类似AJAX的querySting  例子：/home?k=v&kv=,不需要占位。

9.路由传参面试题
1.路由传参（对象写法）path可以结合params参数使用吗？
    答：不可以，对象写法需要有name、path属性（name必须有）。
2.如何指定params参数可传可不传？
    答：在配置路由（router/index.js）时，占位后面加？【表示params可传可不传】
3.params参数传递空串怎么解决？
    答：使用undefined解决params参数传递空串情况
4.路由组件能不能传递props数据？
    答：能，有三种写法：布尔值、对象、函数
    布尔值写法:params
    props:true,
    对象写法:额外给路由组件传参
    props:{a:1,b:2},
    函数写法:可以把params参数和query参数传递给路由组件
    props:($route)=> ({keyword:$route.params.keyword,k:$route.query.k})


//路由传递参数：
//1.字符串形式
// this.$router.push('/search/'+this.keyword+'?k='+this.keyword.toUpperCase())
//2.模板字符串
// this.$router.push(`/search/${this.keyword}?k=${this.keyword.toUpperCase()}`)
//3.对象
//this.$router.push({name:"search",params:{keyword:this.keyword||undefined},query:{k:this.keyword.toUpperCase()}},()=>{},()=>{})



