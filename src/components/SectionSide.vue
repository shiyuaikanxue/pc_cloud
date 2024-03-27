<template>
  <div class="sectionSide">
    <div
      v-for="item in viewBtn"
      :key="item"
      :class="{
        active: view == item.name,
        sideList: view != item.name,
        bottomBr: item.bottomBr,
      }"
      @click="choose(item.name)"
    >
      <svg class="icon" aria-hidden="true">
        <use :href="'#' + item.icon"></use>
      </svg>
      <span>{{ item.content }}</span>
      <svg class="icon" aria-hidden="true" v-show="item.otherIcon">
        <use :href="'#' + item.otherIcon"></use>
      </svg>
    </div>

    <div class="createList">
      <span class="ListLog">创建的歌单<span>（0）</span></span>
      <div class="create">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-jia"></use>
        </svg>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      viewBtn: [
        {
          name: "cloud",
          icon: "icon-yinle",
          content: "云音乐精选",
        },
        {
          name: "podcast",
          icon: "icon-boke",
          content: "播客",
        },
        {
          name: "community",
          icon: "icon-shequ-active",
          bottomBr: "bottomBr",
          content: "社区",
        },
        {
          name: "love",
          icon: "icon-shequ-active",
          content: "我最喜欢的音乐",
          otherIcon: "icon-ziyuan",
        },
        {
          name: "lately",
          icon: "icon-zuijin",
          content: "最近播放",
        },
        {
          name: "download",
          icon: "icon-xiazai",
          content: "下载管理",
        },
        {
          name: "local",
          icon: "icon-music",
          content: "本地音乐",
        },
      ],
    };
  },
  methods: {
    ...mapMutations(["switchView","ViewStackIncrease"]),
    choose:function(path){
      this.ViewStackIncrease()
      this.switchView(path)
      this.$router.push(`/${path}`)
    }
  },
  watch: {},
  computed: {
    ...mapState(["view"]),
  },
};
</script>
<style lang="less" scoped>
.sectionSide {
  height: 100%;
  width: 200px;
  flex-shrink: 0;
  /* background-color: brown; */
  border-right: 1px solid #dcdbdb;
  background-color: #f0f3f6;
  display: flex;
  flex-direction: column;
  align-items: center;
  .sideList {
    &:hover {
      background-color: #e4e8ec;
    }
    height: 40px;
    width: 160px;
    margin: 5px 0;
    display: flex;
    align-items: center;
    border-radius: 10px;
    font-size: 13px;
    color: #797e8d;
    padding: 0 5px;
    .icon {
      width: 18px;
      height: 18px;
      margin: 0 5px;
      fill: #797e8d;
    }
  }
  .active {
    height: 40px;
    width: 160px;
    margin: 5px 0;
    display: flex;
    align-items: center;
    border-radius: 10px;
    font-size: 13px;
    background-color: #f9454c;
    padding: 0 5px;
    color: white;
    .icon {
      width: 18px;
      height: 18px;
      margin: 0 5px;
      fill: #797e8d;
    }
    .icon {
      fill: white;
    }
  }
  .bottomBr {
    &::after {
      content: "";
      width: 80%;
      border-bottom: 1px solid #e4e8ec;
      position: absolute;
      bottom: -15px;
      left: 10px;
    }
    position: relative;
    height: 40px;
    margin-bottom: 25px;
  }
  .createList {
    color: #797e8d;
    font-size: 12px;
    font-weight: 600;
    display: flex;
    width: 160px;
    justify-content: space-between;
    border-top: 1px solid #e4e8ec;
    border-bottom: 1px solid #e4e8ec;
    padding: 20px 0;
    margin-top: 10px;
    .ListLog:hover {
      color: #424459;
    }
    .create {
      width: 16px;
      height: 16px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      background-color: #dcdfe4;
      fill: #5e6476;
      .icon {
        width: 12px;
        height: 12pxs;
      }
    }
  }
}
.create:hover {
  fill: #353b51 !important;
}
</style>
