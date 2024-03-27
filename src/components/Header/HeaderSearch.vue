<template>
  <div class="search">
    <!-- 如果路由栈存在记录则显示可以返回 -->
    <el-button plain @click="back()" :class="viewStack != 0 ? 'return' : 'empty'" >
      <ArrowLeftBold style="width: 16px; height: 16px" />
    </el-button>
    <div class="SearchInput">
      <Search class="activeSearch" style="" />
      <input
        type="text"
        class="Search"
        @focus="showHistory = true"
        @blur="showHistory = false"
        v-model="SearchContent"
      />
      <div class="inputShow" v-show="showHistory"></div>
      <!-- 添加 mousedown.prevent 阻止默认行为，并绑定点击事件处理器 -->  
      <CircleCloseFilled class="activeSearch" @mousedown.prevent="clearSearch"  v-show="showHistory&&SearchContent" />
    </div>
    <div class="audio">
      <Microphone style="width: 20px; height: 20px; color: #66697d" />
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
  components: {},
  data() {
    return {
      SearchContent: "",
      showHistory: false,
    };
  },
  methods: {
    ...mapMutations(["ViewStacDecrease"]),
    clearSearch(){
      // 清空输入框内容
      this.SearchContent = ""
    },
    back(){
      this.ViewStacDecrease()
      this.$router.go(-1)
    }
  },
  computed: {
    ...mapState(["viewStack"]),
  },
};
</script>
<style lang="less" scoped>
.search {
  height: 100%;
  width: 335px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  // background-color: pink;
  justify-content: space-between;
  .empty {
    width: 27px;
    height: 35px;
    color: #cccfd7;
    text-align: center;
    border: 1px solid #f0f2f6;
    border-radius: 5px !important;
  }
  .return {
    &:hover {
      background-color: #e2e5e9;
      border: 1px solid #d0d2d9;
      color: #606678;
    }
    width: 27px;
    height: 35px;
    color: #676c7e;
    text-align: center;
    border: 1px solid #f0f2f6;
    border-radius: 5px;
  }
  .SearchInput {
    position: relative;
    width: 251px;
    height: 31px;
    cursor: pointer;
    position: relative;
    background: linear-gradient(to right, #ebf0fa, #f8eff7);
    border-radius: 5px;
    display: flex;
    // justify-content: center;
    align-items: center;
    &::before {
      /* 1 */
      display: block;
      content: "";
      border-radius: 10px;
      border: 2px solid transparent;
      background: linear-gradient(90deg, #dce6f9, #f6e2f1) border-box; /* 2 */
      mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0); /* 3 */
      mask-composite: xor; /* 4 */
      mask-composite: exclude;
      position: absolute;
      top: -2px;
      left: -2px;
      width: 100%;
      height: 100%;
    }
    .activeSearch {
      width: 20px;
      height: 20px;
      color: #9fa4b3;
      z-index: 2;
      margin: 0 10px;
    }
    .activeSearch:hover {
      color: #67697c;
    }
    .Search {
      border: none;
      // width: 170px;
      height: 35px;
      background-color: transparent;
      z-index: 2;
      outline: none;
    }
    .inputShow {
      position: absolute;
      top: 40px;
      left: 0;
      right: 0;
      background-color: #fff; /* 白框背景 */
      border: 1px solid #ddd; /* 可选的边框 */
      padding: 8px;
      height: 500px; /* 限制列表高度，防止溢出 */
      border-radius: 10px;
      overflow-y: auto; /* 垂直滚动 */
      z-index: 10;
    }
  }
  .audio {
    width: 35px;
    height: 33px;
    border: 1.5px solid #f4e3e2;
    background-color: #f7eef7;
    border-radius: 7px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
