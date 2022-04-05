//Vue插件一定暴露一个对象
let myPlugins = {};
myPlugins.install = function(Vue, options) {
    //自定义插件可以把一个组件的数据方法暴露给所有组件使用
    // Vue.prototype.$bus:任何组件都可以使用（事件总线）
    // Vue.directive全局指令
    // Vue.component全局组件
    // Vue.filter过滤器
    //自定义指令主要用来操作dom的，element是指令所绑定的元素节点，binding是一个对象
    Vue.directive(options.name, (element, binding) => {
        element.innerHTML = binding.value.toUpperCase();
        console.log(binding);
    });
}
export default myPlugins;