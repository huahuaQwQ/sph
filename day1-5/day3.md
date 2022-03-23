1 完成一级分类动态添加背景颜色
    1.采用css完成
        .item:hover
    2.采用methods+css完成
        1）data声明currentIndex:-1
        2)h3 @mouseenter="changeIndex(index)"  一级分类鼠标进入 修改响应式数据currentIndex属性
        3):class="{cur:currentIndex==index}"    当currentIndex==index时，把css样式中的'.cur'{background: skyblue;}
        4)div class="container" @mouseleave="leaveIndex()" 本来离开h3样式消失，现在离开‘全部商品分类’才消失 【事件委派|事件委托】

2通过js控制二三级分类的显示和隐藏
最开始通过css样式  display：none|block显示和隐藏二三级商品分类

3.卡顿现象
正常：事件触发频繁，每一次都触发回调函数都执行。（如果用户操作很快，可能出现卡顿现象）
防抖：前面所有触发都被取消，最后一次执行在规定时间之后触发，也就是说把多次触发变成一次
节流：在规定时间内不会重复触发回调，只有过了才会触发回调，把频繁变偶尔

4.函数防抖与节流
防抖：lodash插件 _.debounce() 防抖方法
节流：lodash插件 _.throttle() 节流方法

5.三级联动节流
import _ from 'lodash';  全部函数引入
import {throttle} from "lodash";   部分对象（模块）引入

6.三级联动路由跳转 传参
home跳转search：一级分类会把用户选中的产品（name，id），和跳转一起传递出去。
路由跳转：
1.声明式导航 router-link     每一次都会出现组件 1000个组件就会有卡顿现象 不推荐！
2.编程式导航 <a @click="goSearch">  循环1000次就有1000个回调函数       不推荐！
3.编程式导航  事件委派：就是把全部子节点（h3、dt、dl、em）事件委派给父亲节点
    如果使用事件委派会存在很多问题：
    1.如何判断点击的一定是a标签
        1）如果点击的是a标签，怎么判断是一级、二级、三级分类
        答：添加自定义属性 :data-categoryName
            节点有dataset属性可以获取自定义属性
    2.如何获取参数（1、2、3级产品的name，id）
    答：加自定义属性:data-category1Id="c1.categoryid"
                   :data-category2Id="c2.categoryid"
                   :data-category3Id="c3.categoryid"


7.完成三级联动路由跳转 传参
    this.$router.push({name:"search",query:{categoryName:'xxx',category2id:'xx'}})