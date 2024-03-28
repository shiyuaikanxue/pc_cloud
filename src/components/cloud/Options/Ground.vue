<template>
  <div class="ground">
    <div class="categoryList">
      <div
        v-for="(item, index) in state.hotCategory"
        :class="index == state.activeIndex ? 'active' : ''"
        :key="item.name"
        class="category"
        @click="selectCategory(index, item.name)"
      >
        {{ item.name }}
      </div>
      <div
        class="category"
        @click="toggleMoreCategory($event)"
        ref="category"
        :class="state.activeIndex == -1 ? 'active' : ''"
      >
        更多分类
        <ArrowDownBold
          class="showIcon"
          style="width: 12px; height: 12px"
          :class="{ rotate: clickOutside && state.moreCategoryIsShow }"
        />
      </div>
      <div
        class="moreCategory"
        :class="{ unfold: clickOutside && state.moreCategoryIsShow }"
      >
        <el-tabs
          v-model="activeName"
          type="card"
          class="demo-tabs"
          @tab-click="handleClick"
        >
          <el-tab-pane
            v-for="(key, index) in state.category"
            :key="index"
            :label="key.name"
            :name="index"
          >
            <div class="layout">
              <div
                v-for="(item, nextIndex) in key.sub"
                :key="item"
                class="moreCategoryStyle"
                @click="selectMore(index, nextIndex, item.name)"
                :class="
                  state.moreCategoryIndexActive == index &&
                  state.moreCategoryNextIndexActive == nextIndex
                    ? 'active'
                    : ''
                "
              >
                {{ item.name }}
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <ListGround :title="activeCategoryValue" :value="Lists"></ListGround>
  </div>
</template>
<script>
import {
  getMusicListCategory,
  getMusicListHot,
  getPersonalized,
  getListsBest,
  getLists,
} from "@/request/api/cloud.js";
import ListGround from "@/components/cloud/Options/Ground/ListGround.vue";
export default {
  data() {
    return {
      state: {
        activeIndex: 0,
        moreCategoryIndexActive: -1,
        moreCategoryNextIndexActive: -1,
        moreCategoryIsShow: false,
        category: {}, //分类风格
        hotCategory: [
          //热门分类
          {
            name: "推荐",
          },
        ],
      },
      clickOutside: true, // 用于追踪点击是否在moreCategory之外
      activeName: "0",
      activeCategoryValue: "推荐",
      Lists: [], //推荐歌单
    };
  },
  components: {
    ListGround,
  },
  methods: {
    init() {
      //获取选中的分类
      this.getIndex();
      if (sessionStorage.getItem("Ground")) {
        //如果存在浏览器保存的数据，则直接用
        const Ground = JSON.parse(sessionStorage.getItem("Ground")).Ground;
        this.state.category = Ground.category;
        this.state.hotCategory = Ground.hotCategory;
      } else {
        this.showCategory(); //数据过期，则重新请求
      }

      if (sessionStorage.getItem(this.activeCategoryValue)) {
        const Lists = JSON.parse(
          sessionStorage.getItem(this.activeCategoryValue)
        ).lists;
        this.Lists = Lists;
      } else {
        this.getList();
      }
    },
    getIndex() {
      if (sessionStorage.getItem("index")) {
        const index = JSON.parse(sessionStorage.getItem("index")).index;
        this.state.activeIndex = index.activeIndex;
        this.state.moreCategoryIndexActive = index.moreCategoryNextIndexActive;
        this.state.moreCategoryNextIndexActive =
          index.moreCategoryNextIndexActive;
        this.activeCategoryValue = index.activeCategoryValue;
      }
    },
    storeIndex() {
      //保存选中的分类，防止跳回刷新
      const index = {
        activeIndex: this.state.activeIndex,
        moreCategoryIndexActive: this.state.moreCategoryIndexActive,
        moreCategoryNextIndexActive: this.state.moreCategoryNextIndexActive,
        activeCategoryValue: this.activeCategoryValue,
      };
      const deadline = 5 * 60 * 1000;
      sessionStorage.setItem(
        "index",
        JSON.stringify({
          index,
          deadline,
        })
      );
    },
    showCategory: async function () {
      let category = await getMusicListCategory(); //获取更多分类
      let hotCategory = await getMusicListHot(); //获取热门分类

      for (const key in category.data.categories) {
        const value = category.data.categories[key];
        this.state.category[key] = { name: value, sub: [] };
      }
      category.data.sub.forEach((item) => {
        this.state.category[item.category].sub.push(item);
      }); //整理拿到的更多分类
      // console.log(category)
      this.state.hotCategory.push(...hotCategory.data.tags);
      const Ground = {
        category: this.state.category,
        hotCategory: this.state.hotCategory,
      };
      const deadline = 60 * 5 * 1000;
      sessionStorage.setItem("Ground", JSON.stringify({ Ground, deadline })); //将拿到的数据保存到浏览器五分钟
    },
    selectCategory: function (index, value) {
      //分类点击事件
      this.state.activeIndex = index;
      this.state.moreCategoryIndexActive = -1;
      this.state.moreCategoryNextIndexActive = -1;
      this.activeCategoryValue = value;
      this.getList();
      this.storeIndex();
    },
    toggleMoreCategory: function (e) {
      e.stopPropagation();
      this.state.moreCategoryIsShow = !this.state.moreCategoryIsShow;
      this.clickOutside = true; // 每次点击更多分类时重置clickOutside状态
    },
    handleOutsideClick(event) {
      if (!(this.clickOutside && this.state.moreCategoryIsShow)) {
        return;
      }
      const moreCategory = document.querySelector(".moreCategory");
      if (moreCategory && !moreCategory.contains(event.target)) {
        this.clickOutside = false;
        this.state.moreCategoryIsShow = !this.state.moreCategoryIsShow;
      }
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    selectMore(index, nextIndex, value) {
      this.state.moreCategoryIndexActive = index;
      this.state.moreCategoryNextIndexActive = nextIndex;
      this.state.activeIndex = -1;
      this.activeCategoryValue = value;
      this.getList();
      this.storeIndex();
    },
    updatePosition: function () {
      this.position = this.getPosition;
    },
    getList: async function () {
      const Lists = await getListsBest(this.activeCategoryValue);
      this.Lists = Lists.data.playlists;
      if (this.Lists.length == 0) {
        const Lists = await getLists(this.activeCategoryValue);
        this.Lists = Lists.data.playlists;
      }
      const lists = this.Lists;
      const deadline = 5 * 60 * 1000;
      sessionStorage.setItem(
        this.activeCategoryValue,
        JSON.stringify({
          lists,
          deadline,
        })
      );
    },
  },
  mounted() {
    this.init();
    document.addEventListener("click", this.handleOutsideClick);
  },
  beforeUnmount() {
    document.removeEventListener("click", this.handleOutsideClick);
  },
};
</script>
<style lang="less" scoped>
.ground {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .categoryList {
    width: 100%;
    height: 60px;
    // background-color: aqua;
    display: flex;
    align-items: center;
    padding: 0 30px;
    box-sizing: border-box;
    position: relative;
    .category {
      &:hover {
        background-color: #f8ebed;
        color: #fc433e;
        border: 1px solid #f7dadc;
      }
      flex-shrink: 0;
      margin-right: 20px;
      height: 40px;
      line-height: 40px;
      padding: 0 20px;
      box-sizing: border-box;
      border: 1px solid #e2e5e9;
      border-radius: 20px;
      color: #2a3148;
      cursor: pointer;
      .showIcon {
        transition: all 0.5s ease;
      }
      .rotate {
        transform: rotateZ(180deg);
      }
    }
    .active {
      &:hover {
        background-color: #f6eaed;
        color: #e23c37;
        border: 1px solid #f3dadb;
      }
      background-color: #f8ebed;
      color: #fc433e;
      border: 1px solid #f7dadc;
    }
    .moreCategory {
      position: absolute;
      width: 450px;
      height: 300px;
      background-color: white;
      z-index: 1;
      right: 360px;
      top: 60px;
      border-radius: 15px;
      transition: all 0.5s ease;
      transform-origin: 50% 0;
      transform: scale(0);
      box-shadow: 1px 1px 10px rgb(214, 212, 212);
      .layout {
        width: 100%;
        height: 100%;
        display: flex;
        padding: 0 10px;
        flex-wrap: wrap;
      }
      .moreCategoryStyle {
        &:hover {
          background-color: #f8ebed;
          color: #fc433e;
          border: 1px solid #f7dadc;
        }
        height: 20px;
        border-radius: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 15px 15px;
        margin-right: 15px;
        margin-top: 10px;
        border: 1px solid #e2e5e9;
        color: #2a3148;
        cursor: pointer;
      }
      .active {
        &:hover {
          background-color: #f6eaed;
          color: #e23c37;
          border: 1px solid #f3dadb;
        }
        background-color: #f8ebed;
        color: #fc433e;
        border: 1px solid #f7dadc;
      }
    }
    .unfold {
      transform: scale(1);
    }
  }
}
</style>
