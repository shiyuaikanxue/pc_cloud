<template>
  <div class="options">
    <span
      v-for="item in options"
      :key="item.name"
      class="title"
      :class="active == item.name ? 'active' : ''"
      @click="selectOption(item.name)"
    >
      {{ item.title }}
      <span class="underline" v-if="active == item.name"></span>
    </span>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
  data() {
    return {
      options: [
        {
          title: "精选",
          name: "select",
        },
        {
          title: "歌单广场",
          name: "ground",
        },
        {
          title: "排行榜",
          name: "rank",
        },
        {
          title: "歌手",
          name: "singer",
        },
        {
          title: "VIP",
          name: "important",
        },
      ],
      // active: "select",
    };
  },
  computed: {
    ...mapState(["active"]),
  },
  methods: {
    ...mapMutations(["updateActive"]),
    selectOption: function (option) {
      // this.active = option;
      this.updateActive(option);
      this.$emit("switch", option);
    },
  },
};
</script>

<style lang="less" scoped>
.options {
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  padding: 0 30px; /* 调整内边距以适应标题和边框 */
  .title {
    margin-right: 20px;
    color: #7c8190;
    position: relative; /* 为子元素（边框）定位做准备 */
    display: inline-flex; /* 允许子元素（边框）与其在同一行 */
    align-items: center; /* 垂直居中标题文本 */
    cursor: pointer;
  }
  .underline {
    position: absolute; /* 绝对定位，相对于最近的定位祖先（在这里是 .title） */
    top: 23px; /* 放置在标题文本的下方 */
    left: 50%; /* 水平居中 */
    width: 20px; /* 设置边框长度 */
    height: 4px; /* 设置边框高度 */
    background-color: #fa4456; /* 设置边框颜色 */
    transform: translateX(-50%); /* 调整水平位置以完全居中 */
    border-radius: 2px;
  }
  .active {
    font-weight: 600;
    color: #2a3148;
  }
}
</style>
