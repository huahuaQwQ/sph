<template>
  <div class="pagination">
    <!-- 上 -->
    <button :disabled="pageNo == 1" @click="$emit('getPageNo', pageNo - 1)">
      上一页
    </button>
    <button
      v-if="startPageAndendPage.start > 1"
      @click="$emit('getPageNo', 1)"
      :class="{ active: pageNo == 1 }"
    >
      1
    </button>
    <button v-if="startPageAndendPage.start > 2">···</button>

    <!-- 中 -->
    <button
      v-for="(page, index) in startPageAndendPage.end"
      :key="index"
      v-if="page >= startPageAndendPage.start"
      @click="$emit('getPageNo', page)"
      :class="{active:pageNo == page}"
    >
      {{ page }}
    </button>

    <!-- 下 -->
    <button v-if="startPageAndendPage.end < totalPage - 1">···</button>
    <button
      v-if="startPageAndendPage.end < totalPage"
      @click="$emit('getPageNo', totalPage)"
      :class="{active:pageNo == totalPage }"
    >
      {{ totalPage }}
    </button>
    <button
      :disabled="pageNo == totalPage"
      @click="$emit('getPageNo', pageNo + 1)"
    >
      下一页
    </button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
    <div style="font-size: 30px; color: red">
      {"start":{{ startPageAndendPage.start }},"end":{{
        startPageAndendPage.end
      }}}---当前页{{ pageNo }}
    </div>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ["pageNo", "pageSize", "total", "continues"],
  computed: {
    //总共多少页
    totalPage() {
      return Math.ceil(this.total / this.pageSize);
    },
    //计算连续页码的起始页码(连续页码数字至少是5)
    startPageAndendPage() {
      const { continues, pageNo, totalPage } = this;
      //定义两个变量存储起始页码和结束页码
      let start = 0,
        end = 0;
      // 连续页码数字5（至少是5）
      //  总页数小于连续页码数量
      if (totalPage < continues) {
        start = 1;
        end = totalPage;
      } else {
        //正常现象（总页数大于5）
        start = pageNo - parseInt(continues / 2);
        end = pageNo + parseInt(continues / 2);
        //不正常现象（start数字出现0|负数）
        if (start < 1) {
          start = 1;
          end = continues;
        }
        //不正常现象（end数字出现大于总页码）
        if (end > totalPage) {
          end = totalPage;
          start = totalPage - continues + 1;
        }
      }
      return { start, end };
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>
