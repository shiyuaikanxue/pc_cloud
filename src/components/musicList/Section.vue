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
        <div class="songInfo sort">
          <div class="order">#</div>
          <div class="sortBar"></div>
          <div class="album">专辑</div>
          <div class="tuck">喜欢</div>
          <div class="lastTime">时长</div>
        </div>
        <div
          class="songInfo"
          v-for="(item, index) in songList"
          :key="item.id"
        >
        <!-- 歌曲id -->
          <div class="order">
            <span class="index">{{ getOrder(index) }}</span>
            <svg class="icon" aria-hidden="true" @click="play(item.id)">
              <use xlink:href="#icon-bofang1"></use>
            </svg>
          </div>
          <div class="info">
            <img :src="item.al.picUrl" alt="" class="cover" />
            <div class="name">
              <div>
                <!-- 歌曲名 -->
                <span class="singName">{{ item.name }}</span>
                <!-- 描述 -->
                <span class="source" v-if="item.alia[0]"> ({{ item.alia[0] }}) </span>
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
          <div class="icons">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-xiazai2"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-shoucang1"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-pinglun"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-gengduo"></use>
            </svg>
          </div>
          <div class="album">
            <span>{{ item.al.name }}</span>
          </div>
          <div class="tuck">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-aixin_line"></use>
            </svg>
          </div>
          <div class="lastTime">
            <span>{{ formatTimestampToMmSs(item.dt) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapMutations, mapState } from 'vuex';
export default {
  data() {
    return {
      active: 0,
    };
  },
  props: ["trackCount", "commentCount", "subscribedCount", "songList"],
  computed: {
    ...mapState(['playlist']),
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
    ...mapMutations(['updatePlaylistIndex']),
    onSwitch(value) {
      this.active = value;
    },
    getOrder(num) {
      if (this.songList.length < 10) {
        return num + 1;
      }
      if (num < 9) {
        return "0" + (num + 1);
      }
      return num + 1;
    },
    formatTimestampToMmSs(timestampInMilliseconds) {
      // 将毫秒转换为秒
      const seconds = Math.floor(timestampInMilliseconds / 1000);
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;

      // 格式化分钟和秒为两位数
      const formattedMinutes = minutes.toString().padStart(2, "0");
      const formattedSeconds = remainingSeconds.toString().padStart(2, "0");

      // 返回格式化的时间字符串
      return `${formattedMinutes}:${formattedSeconds}`;
    },
    play(id){
      let index = this.playlist.findIndex(item=>item.id == id)
      console.log(index)
      this.updatePlaylistIndex(index)
    }
  },
};
</script>
<style lang="less" scoped>
.section {
  width: 100%;
  padding: 0 200px;
  background-color: #f7f9fc;
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
        &:hover {
          background-color: white;
          .icons {
            visibility: visible;
          }
          .order{
            .index{
              display: none;
            }
            .icon{
              display: block;
            }
          }
        }
        width: 100%;
        height: 50px;
        display: flex;
        align-items: center;
        border-radius: 10px;
        overflow: hidden;
        .order,
        .info,
        .icons,
        .album,
        .tuck {
          height: 100%;
          display: flex;
          align-items: center;
        }
        .order {
          width: 50px;
          justify-content: center;
          .icon {
            display: none;
            width: 14px;
            height: 14px;
            fill: #999;
          }
          .index {
            font-size: 12px;
            font-weight: 300;
            color: #c6c2c2;
          }
        }
        .info {
          width: 600px;
          .cover {
            width: 40px;
            height: 40px;
            border-radius: 5px;
            margin-right: 10px;
          }
          .name {
            height: 40px;
          }
          .singName {
            margin-right: 10px;
          }
          .source {
            font-size: 14px;
            color: #999;
          }
          .authorName {
            height: 20px;
            font-size: 14px;
            color: #999;
            display: flex;
            align-items: flex-end;
          }
        }
        .icons {
          width: 150px;
          justify-content: space-around;
          visibility: hidden;
          .icon {
            &:hover {
              fill: black;
            }
            width: 18px;
            height: 18px;
            cursor: pointer;
            fill: #999;
          }
        }
        .album {
          margin-left: 20px;
          width: 420px;
          padding: 0 10px;
          font-size: 14px;
          color: #999;
        }
        .tuck {
          width: 50px;
          margin-right: 20px;
          .icon {
            width: 20px;
            height: 20px;
            fill: #999;
          }
        }
        .lastTime {
          width: 80px;
          font-size: 12px;
          color: #999;
        }
      }
      .sort {
        height: 30px;
        font-size: 14px;
        color: #999;
        .sortBar {
          height: 100%;
          width: 750px;
        }
        .order {
          font-size: 14px;
          color: #c6c2c2;
        }
        .lastTime {
          font-size: 14px;
        }
      }
    }
  }
}
</style>
