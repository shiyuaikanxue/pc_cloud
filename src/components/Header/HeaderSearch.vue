<template>
  <div class="search">
    <!-- 如果路由栈存在记录则显示可以返回 -->
    <el-button
      plain
      @click="back()"
      :class="viewStack != 0 ? 'return' : 'empty'"
    >
      <ArrowLeftBold style="width: 16px; height: 16px" />
    </el-button>
    <div class="SearchInput" ref="searchContainer">
      <Search class="activeSearch" @click="search()" style="" />
      <input
        type="text"
        class="Search"
        @focus="showHistory = true"
        @blur="handleBlur"
        v-model="SearchContent"
      />
      <div class="inputShow" v-show="showHistory" @click.stop="preventBlur">
        <div class="history" v-if="history.length">
          <div class="title">
            <span class="titleSpan">搜索历史</span>
            <el-popconfirm
              confirm-button-text="Yes"
              cancel-button-text="No"
              :icon="InfoFilled"
              icon-color="#626AEF"
              title="确实清空全部历史记录吗？"
              @confirm="confirmEvent"
              @cancel="cancelEvent"
            >
              <template #reference
                ><svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-shanchu2"></use>
                </svg>
              </template>
            </el-popconfirm>
          </div>
          <div class="content">
            <span v-for="item in history" :key="item" class="word">{{
              item
            }}</span>
          </div>
        </div>
        <div class="rank">
          <span class="title">热搜榜</span>
          <div
            v-for="(item, index) in searchHot"
            :key="item.alg"
            @click="searchHotWords(item.searchWord)"
            class="item"
          >
            <span class="index" :class="{ indexActive: index < 3 }">{{
              index + 1
            }}</span>
            <img :src="item.iconUrl" v-if="item.iconUrl" alt="" class="icon" />
            <span class="hot">
              {{ item.searchWord }}
            </span>
          </div>
        </div>
      </div>
      <!-- 添加 mousedown.prevent 阻止默认行为，并绑定点击事件处理器 -->
      <CircleCloseFilled
        class="activeSearch"
        @mousedown.prevent="clearSearch"
        v-show="showHistory && SearchContent"
      />
    </div>
    <div class="audio">
      <Microphone style="width: 20px; height: 20px; color: #66697d" />
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
import { getSearchHot } from "@/request/api/search.js";
export default {
  components: {},
  data() {
    return {
      SearchContent: "",
      showHistory: false,
      history: [],
      searchHot: [],
    };
  },
  methods: {
    ...mapMutations(["ViewStacDecrease"]),
    clearSearch() {
      // 清空输入框内容
      this.SearchContent = "";
    },
    back() {
      this.ViewStacDecrease();
      this.$router.go(-1);
    },
    handleBlur(event) {
      // 检查触发 blur 事件的原因是否不是点击 .inputShow 元素
      // console.log(event.relatedTarget);
      // if (!this.$el.querySelector(".inputShow").contains(event.relatedTarget)) {
      //   this.showHistory = false;
      // }
    },
    preventBlur(event) {
      // 阻止事件冒泡，避免触发输入框的 blur 事件
      event.stopPropagation();
    },
    handleDocumentClick(event) {
      // 检查点击事件的目标是否在组件的容器之外
      if (!this.$refs.searchContainer.contains(event.target)) {
        this.showHistory = false;
      }
    },
    search() {
      const word = this.SearchContent;
      if (word == "") return;
      if (this.history.indexOf(word) != -1) {
        this.history = this.history.filter((item) => item != word);
      }
      this.history.unshift(word);
      if (this.history.length > 10) {
        this.history = this.history.slice(0, 10);
      }
      localStorage.setItem("history", JSON.stringify(this.history));
      console.log(this.history);
    },
    searchHotWords(value) {
      this.SearchContent = value;
      this.search();
    },
    getSearch() {
      if (localStorage.getItem("history")) {
        this.history = JSON.parse(localStorage.getItem("history"));
      }
    },
    getHot: async function () {
      let res = await getSearchHot();
      this.searchHot = res.data.data;
    },
    init() {
      this.getSearch(); //得到搜索历史
      this.getHot(); //得到热搜列表
    },
    confirmEvent() {
      this.history = [];
      localStorage.removeItem("history");
    },
    cancelEvent() {
      console.log("取消");
    },
  },
  computed: {
    ...mapState(["viewStack"]),
  },
  mounted() {
    this.init();
    document.addEventListener("mousedown", this.handleDocumentClick);
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
      width: 170px;
      height: 35px;
      background-color: transparent;
      z-index: 2;
      outline: none;
    }
    .inputShow {
      &::-webkit-scrollbar-button {
        display: none;
      }
      width: 350px;
      height: 600px;
      position: absolute;
      top: 50px;
      left: -50px;
      background-color: #fff; /* 白框背景 */
      border: 1px solid #ddd; /* 可选的边框 */
      height: 500px; /* 限制列表高度，防止溢出 */
      border-radius: 10px;
      overflow-y: auto; /* 垂直滚动 */
      z-index: 20;
      box-sizing: border-box;
      overflow-x: hidden;
      .history {
        width: 100%;
        .title {
          height: 40px;
          width: 100%;
          display: flex;
          justify-content: space-between;
          margin: 10px;
          .titleSpan {
            font-size: 16px;
            color: gray;
          }
          .icon {
            &:hover {
              fill: black;
            }
            width: 25px;
            height: 25px;
            fill: gray;
            margin-right: 20px;
          }
        }
        .content {
          width: 100%;
          display: flex;
          flex-wrap: wrap;
          .word {
            padding: 5px 15px;
            border-radius: 20px;
            margin: 5px 5px;
            background-color: #dfdede;
            font-size: 10px;
          }
        }
      }
      .rank {
        width: 100%;
        .title {
          width: 100%;
          height: 30px;
          display: block;
          font-size: 16px;
          color: gray;
          margin: 15px;
        }
        .item {
          &:hover {
            background-color: #f4f2f2;
          }
          width: 100%;
          height: 50px;
          display: flex;
          align-items: center;
          padding: 0 15px;
          box-sizing: border-box;
          .index {
            display: inline-block;
            font-size: 16px;
            color: #999;
            margin-right: 10px;
            font-weight: 600;
          }
          .indexActive {
            color: #fc433e;
          }
          .icon {
            width: 16px;
            height: 16px;
          }
        }
      }
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
