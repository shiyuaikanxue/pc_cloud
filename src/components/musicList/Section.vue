<template>
  <div class="section">
    <div class="value">
      <div class="options">
        <div
          class="option"
          v-for="(item, index) in getArray"
          :key="item.name"
          :class="active == index ? 'active' : ''"
          @click="onSwitch(index)"
        >
          <div class="flex">
            <span class="title">{{ item.name }}</span>
          </div>
          <span class="count">{{ item.count }}</span>
        </div>
      </div>
      <div class="songList">
        <div class="sort">排序</div>
        <div
          class="songInfo"
          v-for="(item, index) in songList"
          :key="item.al.id"
        >
          <div class="order">
            <span class="index">{{ getOrder(index) }}</span>
          </div>
          <div class="info">
            <img :src="item.al.picUrl" alt="" class="cover" />
            <div class="name">
              <div class="singName">
                <!-- 歌曲名 -->
                <span>{{ item.name }}</span>
                <!-- 描述 -->
                <span>
                  {{ item.alia[0] }}
                </span>
              </div>
              <div class="authorName">
                <span>{{ item.ar[0].name }}</span>
                <span
                  v-for="author in item.ar.slice(1, item.ar.length)"
                  :key="author.id"
                >
                  {{ " / " + author.name }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: 0,
    };
  },
  props: ["trackCount", "commentCount", "subscribedCount", "songList"],
  computed: {
    getArray() {
      const title = [
        {
          name: "歌曲",
          count: this.trackCount,
        },
        {
          name: "评论",
          count: this.commentCount,
        },
        {
          name: "收藏者",
          count: this.subscribedCount,
        },
      ];
      return title;
    },
  },
  methods: {
    onSwitch(value) {
      this.active = value;
    },
    getOrder(num) {
      if (this.songList.length < 10) {
        return num;
      }
      if (num < 10) {
        return "0" + num;
      }
      return num;
    },
  },
};
</script>
<style lang="less" scoped>
.section {
  width: 100%;
  padding: 0 200px;
  //   height: 100%;
  .value {
    // height: 100%;
    width: 1440px;
    padding: 0 20px 20px;
    box-sizing: border-box;
    .options {
      display: flex;
      width: 100%;
      height: 25px;
      align-items: center;
      .option {
        height: 100%;
        margin-right: 40px;
        color: #999;
        display: flex;
        .flex {
          height: 100%;
          display: flex;
          align-items: center;
          .title {
            font-size: 18px;
          }
        }
        .count {
          font-size: 10px;
        }
      }
      .active {
        color: black;
        .title {
          position: relative;
          &::after {
            content: "";
            display: block;
            position: absolute;
            width: 20px;
            height: 4px;
            background-color: #f9454c;
            bottom: -5px;
            left: 50%;
            transform: translateX(-50%);
            border-radius: 2px;
          }
          font-weight: 600;
        }
      }
    }
    .songList {
      width: 100%;
      .sort {
        width: 100%;
        height: 40px;
        margin-top: 10px;
      }
      .songInfo {
        width: 100%;
        height: 50px;
        display: flex;
        align-items: center;
        border-radius: 10px;
        overflow: hidden;
        .order {
          height: 100%;
          width: 50px;
          display: flex;
          justify-content: center;
          align-items: center;
          .index {
            font-size: 12px;
            font-weight: 300;
            color: #c6c2c2;
          }
        }
        .info {
          height: 100%;
          width: 500px;
          display: flex;
          align-items: center;
          background-color: aquamarine;
          .cover {
            width: 40px;
            height: 40px;
            border-radius: 5px;
            margin-right: 10px;
          }
          .name{
            height: 40px;
          }
        }
      }
    }
  }
}
</style>
