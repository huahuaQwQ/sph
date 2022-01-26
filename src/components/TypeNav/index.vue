<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <!-- 事件委派leaveIndex() 鼠标离开一级分类样式还在，离开‘全部商品分类’才消失-->
    <div class="container" @mouseleave="leaveshow" @mouseenter="entershow">
      <h2 class="all">全部商品分类</h2>
      <!-- 三级联动;过渡动画 -->
      <transition name="sort"> 
        <div class="sort" v-show="show">
          <!-- 利用事件的委派+编程式导航实现路由的跳转与传递参数 -->
          <div class="all-sort-list2" @click="goSearch">
            <div
              class="item"
              v-for="(c1, index) in categoryList"
              :key="c1.categoryId"
              :class="{ cur: currentIndex == index }"
            >
              <h3 @mouseenter="changeIndex(index)">
                <a
                  :data-categoryName="c1.categoryName"
                  :data-category1Id="c1.categoryid"
                  >{{ c1.categoryName }}</a
                >
              </h3>
              <!-- 二级、三级分类 -->
              <!-- 当currentIndex == index时 -->
              <div
                class="item-list clearfix"
                :style="{ display: currentIndex == index ? 'block' : 'none' }"
              >
                <div
                  class="subitem"
                  v-for="(c2, index) in c1.categoryChild"
                  :key="c2.categoryId"
                >
                  <dl class="fore">
                    <dt>
                      <a
                        :data-categoryName="c2.categoryName"
                        :data-category2Id="c2.categoryId"
                        >{{ c2.categoryName }}</a
                      >
                    </dt>
                    <dd>
                      <em
                        v-for="(c3, index) in c2.categoryChild"
                        :key="c3.categoryId"
                      >
                        <a
                          :data-categoryName="c3.categoryName"
                          :data-category3Id="c3.categoryId"
                          >{{ c3.categoryName }}</a
                        >
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import throttle from "lodash/throttle";
export default {
  name: "TypeNav",
  data() {
    return {
      //存储用户鼠标移到哪个一级分类
      currentIndex: -1,
      show: true,
    };
  },
  //组件挂载完毕:服务器发请求
  mounted() {
    
    //挂载完毕后，让show属性变成false【search组件需要】
    //判断路由路径,如果不是home就隐藏三级分类
    console.log(this.$route.path);
    if (this.$route.path != "/home") {
      this.show = false;
    }
  },
  computed: {
    ...mapState({
      //categoryList右侧需要一个函数，当使用计算属性computed时，右侧就会执行一次。
      //注入一个state参数，他是vuex大仓库的数据（包括了home、search等小仓库数据）
      categoryList: (state) => state.home.categoryList.slice(0, 16),
    }),
  },
  methods: {
    //一级分类鼠标进入 修改响应式数据currentIndex属性
    changeIndex: throttle(function (index) {
      //index:鼠标移到某一个一级分类的元素索引值
      //_.throttle 节流方法
      this.currentIndex = index;
    }, 50),
    //一级分类鼠标移出去的事件回调;鼠标离开"全部商品分类"时，隐藏商品分类 show = false
    leaveshow() {
      this.currentIndex = -1;
      //路径判断:如果是search路由组件时才会执行
      if (this.$route.path != "/home") {
        this.show = false;
      }
    },
    //路由跳转到search组件 携带query参数
    goSearch(event) {
      //编程式导航+事件委派    详细看day3.md 第6点
      let element = event.target;
      //节点有dataset属性可以获取自定义属性
      let { categoryname, category1id, category2id, category3id } = element.dataset;
      if (categoryname) {
        //整理路由跳转参数
        let location = { name: "search" };
        let query = { categoryName: categoryname };
        //一级、二级、三级分类a标签
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else if (category3id) {
          query.category3Id = category3id;
        }
        
        //判断：如果路由跳转时，带有params参数，一起传递过去
        if(this.$route.params){
          location.params = this.$route.params;
          //动态给location配置对象添加query属性
          location.query = query;
          //路由跳转
          this.$router.push(location);

        }
      }
    },
    //鼠标进入"全部商品分类"时，显示商品分类 show = ture
    entershow() {
      if (this.$route.path != "/home") {
        this.show = true;
      }
    },
  },
};
</script>

<style scoped lang="less">
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;
      //BFC规范
      //overflow: hidden;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
          /**&是占位符，表示item
           &:hover {
            .item-list {
              display: block;
            }
          } */
        }
        .cur {
          background: skyblue;
        }
      }
    }

    //过渡动画的样式
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
  }
}
</style>