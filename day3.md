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

