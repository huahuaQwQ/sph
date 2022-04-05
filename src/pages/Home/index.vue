<template>
  <div>
    <!-- 三级联动全局组件 -->
    <TypeNav />
    <ListContainer />
    <Recommend />
    <Rank />
    <Like />
    <!-- list是自定义属性，floor是home组件传递给floor组件的值（floorList遍历出来的一个对象） 父传子 通信-->
    <Floor v-for="(floor,index) in floorList" :key="floor.id" :list="floor"/>
    <Brand />
  </div>
</template>

<script>
//引入其余的组件
import ListContainer from "@/pages/Home/ListContainer";
import Recommend from "@/pages/Home/Recommend";
import Rank from "@/pages/Home/Rank";
import Like from "@/pages/Home/Like";
import Floor from "@/pages/Home/Floor";
import Brand from "@/pages/Home/Brand";
import { mapState } from "vuex";

export default {
  name: "Home",
  components: {
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand,
  },
  mounted() {
    //派发action，获取floor组件数据
    this.$store.dispatch("getFloorList");
  },
  computed: {
    ...mapState({
      floorList: (state) => state.home.floorList,
    }),
  },
};
</script>

<style scoped lang="less">
</style>