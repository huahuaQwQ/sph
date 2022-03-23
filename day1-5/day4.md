复习：
1）商品分类三级联动静态变动态（获取服务器数据：解决跨域问题）axios 代理跨域
2）函数防抖与节流    三级联动分类使用节流
3）路由跳转与传参    声明式导航   不推荐
4）路由跳转与传参    编程式导航   每个a标签要添加@click  不推荐
5）路由跳转与传参    编程式导航+事件委派：把所有a标签委派给父节点，在父节点身上添加@click     a标签添加自定义属性分辨     节点有dataset属性可以获取自定义属性


1.开发search组件中TypeNav商品分类菜单（过渡动画效果）
路径判断是否是/home
过渡动画必须要有 v-if v-show指令的外面包裹着<transition></transition>标签
<transition name="sort">
</transition>
那就不能v-开头，必须sort-开头
//过渡动画的样式 css样式less
//过渡动画进入开始
.sort-enter{
    height: 0px;
    opacity: 0;
}
//过渡动画进入结束
.sort-enter-to{
    height: 461px;
    opacity: 1;
}
//定义动画时间、速率
.sort-enter-active{
    transition: all .5s linear;
}

2.性能优化
把TypeNav的mounted函数里
//向vuex发请求，获取数据，存储于仓库
this.$store.dispatch("categoryList");
转移到App.vue的mounted函数里(App.vue发请求的根组件mounted只会执行一次)

3.合并params和query参数

4.home首页组件 ListContainer组件与Floor组件
服务器返回的数据只有商品分类数据
mock数据（模拟数据）：mockjs   mock数据会被浏览器拦截[在Chrome开发者中network看不到]，不会进入服务器
cnpm install --save mockjs

    使用步骤：
    1)在src创建mock文件夹
    2)准备json数据，格式化一下
    3)mock需要的图片放在public/images中（public文件夹在打包时，会把全部资源打包到dist文件夹）
    4)在mock文件夹下创建mockServe.js通过mock插件实现模拟数据
    5)mockServe.js在入口文件main.js引入，执行。


5.ListContainer组件开发
安装swiper@5
    1）引入（js与css）
    2）页面结构一定先有
    3）new Swiper实例