<template>
  <div class="header">
    <div class="info">
      <div class="cover">
        <img
          :src="info.coverImgUrl"
          alt=""
          v-if="info.coverImgUrl"
          class="coverImg"
        />
        <div class="play" v-if="info.playCount">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-bofang2"></use>
          </svg>
          <span class="playCount">{{ getNum(info.playCount) }}</span>
        </div>
      </div>
      <div class="description">
        <h3 v-if="info.name">{{ info.name }}</h3>
        <div class="describe" v-if="info.description">
          {{ info.description }}
        </div>
        <div class="author">
          <img
            :src="info.creator.avatarUrl"
            alt=""
            v-if="info.creator.avatarUrl"
            class="authorCover"
          />
          <span v-if="info.creator.nickname" class="authorName">
            {{ info.creator.nickname }}
          </span>
          <span v-if="info.tags" class="tags">
            <span> 标签：{{ info.tags[0] }}</span>
            <span
              v-for="item in info.tags.slice(1, info.tags.length)"
              :key="item"
            >
              /{{ " " + item }}
            </span>
          </span>
          <span class="createTime" v-if="info.createTime != 0">
            {{ formatTimestamp }}创建
          </span>
        </div>
        <div class="btns" v-if="info.subscribedCount">
          <div class="playAll">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-bofang2"></use>
            </svg>
            <span>播放全部</span>
          </div>
          <div class="subscribedCount">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-shoucang"></use>
            </svg>
            <span>{{ getNum(info.subscribedCount) }}</span>
          </div>
          <div class="download">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-xiazai1"></use>
            </svg>
            <span>下载</span>
          </div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["info"],
  computed: {
    formatTimestamp() {
      const date = new Date(this.info.createTime);
      const year = date.getFullYear();
      const month = ("0" + (date.getMonth() + 1)).slice(-2); // 月份从0开始，所以+1，并补0
      const day = ("0" + date.getDate()).slice(-2); // 补0
      return `${year}-${month}-${day}`;
    },
  },
  methods:{
    getNum(num) {
      if (num > 100000000) {
        return (num / 100000000).toFixed(2) + "亿";
      } else if (num > 10000) {
        return (num / 10000).toFixed(2) + "万";
      }
      return num;
    }
  }
};
</script>
<style lang="less" scoped>
.header {
  width: 100%;
  height: 240px;
  padding: 0 200px;
  .info {
    height: 100%;
    width: 1440px;
    padding: 20px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    .cover {
      width: 200px;
      height: 100%;
      margin-right: 20px;
      position: relative;
      .coverImg {
        width: 100%;
        border-radius: 10px;
      }
      .play {
        position: absolute;
        top: 10px;
        right: 10px;
        display: flex;
        height: 12px;
        font-size: 12px;
        .icon {
          width: 12px;
          height: 12px;
          fill: white;
        }
        .playCount {
          color: rgb(143, 130, 130);
          mix-blend-mode: difference;
        }
      }
    }
    .description {
      flex: 1;
      height: 100%;
      .describe {
        height: 30px;
        width: 100%;
        margin-top: 15px;
        font-size: 12px;
        color: rgb(50, 50, 51);
        font-weight: 300;
        word-break: break-all;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }
    .author {
      width: 100%;
      height: 50px;
      margin-top: 10px;
      display: flex;
      align-items: center;
      padding: 5px 0;
      .authorCover {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-right: 10px;
      }
      .authorName,
      .tags,
      .createTime {
        font-size: 12px;
        font-weight: 300;
        margin-right: 15px;
      }
    }
    .btns {
      height: 50px;
      width: 100%;
      margin-top: 20px;
      display: flex;
      align-items: center;
      .playAll,
      .subscribedCount,
      .download {
        width: 120px;
        height: 100%;
        border-radius: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #f9454c;
        color: white;
        margin-right: 15px;
        .icon {
          width: 16px;
          height: 16px;
          fill: white;
        }
      }
      .subscribedCount,
      .download {
        width: 100px;
        box-sizing: border-box;
        background-color: rgb(238, 236, 236);
        border: 1px solid rgb(213, 212, 212);
        color: #999;
        .icon {
          fill: #999;
        }
      }
    }
  }
}
</style>
