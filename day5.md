1.解决轮播图问题
watch + nextTick：数据监听，监听已有数据变化
nextTick:将回调延迟到下次 DOM 更新循环之后执行。在修改数据之后立即使用它，然后等待 DOM 更新。它跟全局方法 Vue.nextTick 一样，不同的是回调的 this 自动绑定到调用它的实例上。
this.$nextTick(() => {
    函数体
}
nextTick能保证页面结构（dom存在了）已经有了，在使用"插件"（swiper）的功能

2：开发floor组件
1.在api的index.js中export const reqFloorList = ()=>mockRquests.get('/floor');
2.在store的home.js中
import reqFloorList实例对象
    1）然后在action中获取floor组件数据 commit到mutation的GETFLOORLIST
    2）mutation接收action传入的getFloorList，以及state存储floor数据，进行赋值。
    3）state的存储floor数据类型取决于服务器返回的数据类型

2.1：action在哪里触发？
不能在floor组件内部触发action，必须在home组件触发action，因为要用v-for遍历floor组件。

2.2:v-for可以在自定义标签使用
2.3：组件通信方式
props：用于父子组件通信 父传子
自定义事件：$on $emit 子传父
全局事件总线：$bus 全能
pubsub-js：vue不使用 全能
插槽
vuex

3:home首页的轮播图拆分为公共的全局组件：结构样式行为必须一样
在开发项目时，看到某一个组件在很多地方都使用，把它变成全局组件
优点：注册一次可以在任意地方使用。
把全局组件（非路由组件）放在conponents文件夹中。

4：search模块开发
1.写静态页面+静态组件拆分
2.发请求api
3.写仓库vuex（三连环）
4.组件获取仓库数据，动态展示数据。
