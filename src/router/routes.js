//routes.js配置路由组件
//引入一级路由组件
/* 废弃掉写法：使用了路由懒加载
import Home from '@/pages/Home';
import Search from '@/pages/Search';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Detail from '@/pages/Detail';
import AddCartSuccess from '@/pages/AddCartSuccess';
import ShopCart from '@/pages/ShopCart';
import Trade from '@/pages/Trade';
import Pay from '@/pages/Pay';
import PaySuccess from '@/pages/PaySuccess';
import Center from '@/pages/Center';
//引入二级路由组件
import MyOrder from '@/pages/Center/myOrder';
import GroupOrder from '@/pages/Center/groupOrder'; */

/**
 * 路由懒加载：
 * 当打包构建应用时，JavaScript 包会变得非常大，影响页面加载。
 * 如果我们能把不同路由对应的组件分割成不同的代码块，
 * 然后当路由被访问的时候才加载对应组件，
 * 这样就会更加高效。
 */
// 路由懒加载测试
// const Home = () => {
//     console.log(11111);
//     return import ("@/pages/Home");
// };

//路由配置信息
export default [

    {
        path: "/center",
        name: 'Center',
        component: () =>
            import ('@/pages/Center'),
        meta: { show: true },
        children: [

            {
                //二级路由path要写'/'就要写全(/center/myorder)，不写'/'就不用写全。
                // path: '/center/myorder',
                path: 'myorder',
                component: () =>
                    import ('@/pages/Center/myOrder'),
            },
            {
                //二级路由path要写'/'就要写全(/center/grouporder)，不写'/'就不用写全。
                path: 'grouporder',
                component: () =>
                    import ('@/pages/Center/groupOrder'),
            },
            //路由重定向
            {
                //重定向path需要写全'/'不能落下！！
                path: '/center',
                redirect: '/center/myorder'
            }

        ],

    },
    {
        path: "/paysuccess",
        name: 'PaySuccess',
        component: () =>
            import ('@/pages/PaySuccess'),
        meta: { show: true },

    },
    {
        path: "/pay",
        name: 'Pay',
        component: () =>
            import ('@/pages/Pay'),
        meta: { show: true },
        //路由独享守卫
        beforeEnter: (to, from, next) => {
            //只有交易页面能去支付页面
            if (from.path == '/trade' || from.path == "/") {
                next();
            } else {
                //其他的路由组件去不了支付页面
                next(from.path);
            }
        }
    },
    {
        path: "/trade",
        name: 'Trade',
        component: () =>
            import ('@/pages/Trade'),
        meta: { show: true },
        //路由独享守卫
        beforeEnter: (to, from, next) => {
            //去交易页面只能从购物车页面去！
            if (from.path == '/shopcart' || from.path == "/") {
                next();
            } else {
                //其他的路由组件去不了交易页面
                next(from.path);
            }
        }
    },
    {
        path: "/shopcart",
        name: 'shopcart',
        component: () =>
            import ('@/pages/ShopCart'),
        meta: { show: true }
    },
    {
        path: "/addcartsuccess",
        name: 'addcartsuccess',
        component: () =>
            import ('@/pages/AddCartSuccess'),
        meta: { show: true }
    },
    {
        path: "/detail/:skuId",
        component: () =>
            import ('@/pages/Detail'),
        meta: { show: true }
    },
    {
        path: "/home",
        component: () =>
            import ("@/pages/Home"),
        meta: { show: true }
    },
    {
        path: "/search/:keyword?",
        component: () =>
            import ('@/pages/Search'),
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
        component: () =>
            import ('@/pages/Login'),
        meta: { show: false }
    },
    {
        path: "/register",
        component: () =>
            import ('@/pages/Register'),
        meta: { show: false }
    },
    //重定向，在项目跑起来时，访问/，立马定向到首页
    {
        path: "*",
        redirect: "/home"
    }
];