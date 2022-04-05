<template>
  <div>
    <!-- 自定义插件&&自定义指令 -->
    <!-- <h1 v-upper.erha="msg"></h1> -->
    <Header></Header>
    <!-- 路由组件出口 -->
    <router-view></router-view>
    <!-- 利用路由元信息：footer组件在home\search显示,login\register隐藏  详情看day1.md
    -->

    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";
export default {
  name: "App",
  // data() {
  //   return {
  //     msg:'adc'
  //   }
  // },
  components: {
    Header,
    Footer,
  },
  mounted() {
    //派发一个action，获取商品分类的三级列表数据
    this.$store.dispatch("categoryList");

  },
};
</script>

<style >
</style>
