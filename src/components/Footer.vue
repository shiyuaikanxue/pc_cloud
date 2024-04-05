<template>
  <div class="footer">
    <div class="left">
      <img
        :src="playlist[playlistIndex].al.picUrl"
        alt=""
        class="cover"
        @click="openDetail()"
      />
      <div class="info">
        <div class="name">
          <Vue3Marquee :pause="isbtnShow"
            ><span @click="openDetail()" class="songName">
              {{ playlist[playlistIndex].name + " - " }}
            </span>
            <span class="authorName">
              {{ playlist[playlistIndex].ar[0].name }}
            </span>
            <span
              v-for="item in playlist[playlistIndex].ar.slice(
                1,
                playlist[playlistIndex].ar.length
              )"
              :key="item.id"
              class="authorName"
            >
              {{ " / " + item.name }}
            </span>
            <span style="width: 30px"></span
          ></Vue3Marquee>
        </div>
        <div class="icons">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-shoucang"></use>
          </svg>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-pinglun"></use>
          </svg>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-zhuanfa"></use>
          </svg>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-xiazai2"></use>
          </svg>
        </div>
      </div>
    </div>
    <div class="middle">
      <div class="icons">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-aixin_line"></use>
        </svg>
        <svg class="icon" aria-hidden="true" @click="goPlay(-1)">
          <use xlink:href="#icon-shangyishou"></use>
        </svg>
        <svg
          class="icon play"
          aria-hidden="true"
          v-show="isbtnShow"
          @click="play()"
        >
          <use xlink:href="#icon-bofang"></use>
        </svg>
        <svg
          class="icon play"
          aria-hidden="true"
          v-show="!isbtnShow"
          @click="play()"
        >
          <use xlink:href="#icon-zanting21"></use>
        </svg>
        <svg class="icon" aria-hidden="true" @click="goPlay(1)">
          <use xlink:href="#icon-xiayishou"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-shunxubofang"></use>
        </svg>
      </div>
      <div class="progressBar">
        <span class="time">
          {{ formatSecondsToMmSs(currentTime) }}
        </span>
        <input
          type="range"
          ref="range"
          class="range"
          @input="updateRange($event.target.value)"
          min="0"
          step="0.05"
          :max="duration / 1000"
          :value="currentTime"
        />
        <span class="time">
          {{ formatTimestampToMmSs(duration) }}
        </span>
      </div>
    </div>
    <div class="right">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-lrc"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-huiyuan"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-liebiao"></use>
      </svg>
      <svg class="icon" aria-hidden="true" v-show="!mute" @click="muted()">
        <use xlink:href="#icon-yinliangdaxiao"></use>
      </svg>
      <svg class="icon" aria-hidden="true" v-show="mute" @click="muted()">
        <use xlink:href="#icon-guanbiyinliang"></use>
      </svg>
      <input
        type="range"
        class="sound"
        min="0"
        max="1"
        step="0.01"
        :value="volume"
        :disabled="mute"
        @input="operateVolume($event.target.value)"
      />
    </div>
    <audio
      ref="audio"
      id="myAudio"
      :muted="mute"
      :src="`https://music.163.com/song/media/outer/url?id=${playlist[playlistIndex].id}.mp3`"
    ></audio>
    <van-popup
      v-model:show="isDetail"
      position="bottom"
      :style="{ height: '100%', width: '100%' }"
      class="detail"
      ><MusicDetail
        @fold="fold()"
        :song="playlist[playlistIndex]"
        @skip="updateRange"
      >
        <template v-slot:range>
          <input
            type="range"
            ref="range"
            class="wideRange"
            @input="updateRange($event.target.value)"
            min="0"
            step="0.05"
            :max="duration / 1000"
            :value="currentTime"
          />
        </template>
        <template v-slot:iconInfo>
          <div class="iconsInfo">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-shoucang"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-pinglun"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-zhuanfa"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-xiazai2"></use>
            </svg>
            <span class="rate">
              {{ formatSecondsToMmSs(currentTime) + " /" }}
              {{ formatTimestampToMmSs(duration) }}
            </span>
          </div>
        </template>
        <template v-slot:iconPlay>
          <div class="iconPlay">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-aixin_line"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-shangyishou"></use>
            </svg>
            <svg
              class="icon play"
              aria-hidden="true"
              v-show="isbtnShow"
              @click="play()"
            >
              <use xlink:href="#icon-bofang"></use>
            </svg>
            <svg
              class="icon play"
              aria-hidden="true"
              v-show="!isbtnShow"
              @click="play()"
            >
              <use xlink:href="#icon-zanting21"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-xiayishou"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-shunxubofang"></use>
            </svg>
          </div>
        </template>
        <template v-slot:sound>
          <div class="soundIcons">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-lrc"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-huiyuan"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-liebiao"></use>
            </svg>
            <svg
              class="icon"
              aria-hidden="true"
              v-show="!mute"
              @click="muted()"
            >
              <use xlink:href="#icon-yinliangdaxiao"></use>
            </svg>
            <svg class="icon" aria-hidden="true" v-show="mute" @click="muted()">
              <use xlink:href="#icon-guanbiyinliang"></use>
            </svg>
            <input
              type="range"
              class="sound"
              min="0"
              max="1"
              step="0.01"
              :value="volume"
              :disabled="mute"
              @input="operateVolume($event.target.value)"
            /></div
        ></template> </MusicDetail
    ></van-popup>
  </div>
</template>
<script>
import { mapActions, mapMutations, mapState } from "vuex";
import { Vue3Marquee } from "vue3-marquee";
import { getMusicDetail } from "@/request/api/music.js";
import MusicDetail from "@/components/Footer/MusicDetail.vue";
export default {
  data() {
    return {
      interVal: 0,
    };
  },
  components: {
    Vue3Marquee,
    MusicDetail,
  },
  computed: {
    ...mapState([
      "playlist",
      "playlistIndex",
      "isbtnShow",
      "currentTime",
      "duration",
      "volume",
      "mute",
      "isDetail",
    ]),
  },
  methods: {
    ...mapMutations([
      "updateIsbtnShow",
      "updateCurrentTime",
      "updateDuration",
      "updateVolume",
      "updateMute",
      "updateIsDetail",
      "updatePlaylistIndex",
    ]),
    init() {
      this.addDuration(); //设置初始歌曲时间
      this.$store.dispatch("getLyric", this.playlist[this.playlistIndex].id);
    },
    muted() {
      //是否静音
      this.updateMute(!this.mute);
    },
    openDetail() {
      //打开详情页
      this.updateIsDetail(true);
    },
    fold() {
      //关闭详情页
      this.updateIsDetail(false);
    },
    goPlay(Number) {
      console.log(Number);
      let index = Number + this.playlistIndex;
      if (index < 0) {
        index = this.playlist.length - 1;
      } else if (index == this.playlist.length) {
        index = 0;
      }
      this.updatePlaylistIndex(index);
      console.log(this.playlistIndex);
    },
    play() {
      if (this.$refs.audio.paused) {
        this.$refs.audio.play(); //audio播放
        this.updateIsbtnShow(false); //改变按钮是否显示
        this.updateTime(); //播放就创建定时器，改变当前时间值
      } else {
        this.$refs.audio.pause();
        this.updateIsbtnShow(true);
        clearInterval(this.interVal); //暂停就清除定时器
      }
    },
    updateTime: function () {
      //设置播放定时器，时刻改变当前时间
      this.interVal = setInterval(() => {
        this.updateCurrentTime(this.$refs.audio.currentTime);
      }, 200);
    },
    operateVolume(value) {
      this.updateVolume(value);
      this.$refs.audio.volume = this.volume;
    },
    updateRange(value) {
      this.$refs.audio.currentTime = value;
    },
    addDuration: async function () {
      //获取歌曲总时间
      const res1 = await getMusicDetail(this.playlist[this.playlistIndex].id);
      console.log(res1.data.songs[0].dt);
      this.updateDuration(res1.data.songs[0].dt);
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
    formatSecondsToMmSs(seconds) {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = Math.floor(seconds % 60); // 确保秒数为整数
      const formattedMinutes = minutes.toString().padStart(2, "0");
      const formattedSeconds = remainingSeconds.toString().padStart(2, "0");
      return `${formattedMinutes}:${formattedSeconds}`;
    },
  },
  mounted() {
    this.init();
  },
};
</script>
<style lang="less" scoped>
.footer {
  width: 100%;
  height: 80px;
  border-top: 1px solid #d8d7d7;
  flex-shrink: 0;
  display: flex;
  justify-content: space-between;
  .left,
  .iddle,
  .right {
    height: 100%;
    display: flex;
  }
  .left {
    width: 330px;
    padding: 10px;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    .cover {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      margin: 0 15px;
    }
    .info {
      height: 60px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .name {
        height: 20px;
      }
      .songName {
        margin-right: 5px;
      }
      .authorName {
        font-size: 12px;
        color: #999;
        margin-right: 5px;
      }
      .icons {
        margin-top: 5px;
        display: flex;
        align-items: flex-end;
        .icon {
          &:hover {
            fill: black;
            transform: scale(1.2);
          }
          height: 20px;
          width: 20px;
          fill: #999;
          margin-right: 20px;
        }
      }
    }
  }
  .middle {
    flex-direction: column;
    align-items: center;
    width: 500px;
    // background-color: aquamarine;
    .icons {
      width: 100%;
      height: 40px;
      display: flex;
      margin-top: 10px;
      justify-content: center;
      align-items: center;
      .icon {
        height: 25px;
        width: 25px;
        fill: #999;
        margin: 0 15px;
      }
      .play {
        &:hover {
          transform: scale(1.9);
        }
        fill: #f9454c;
        transform: scale(1.8);
      }
    }
    .progressBar {
      width: 100%;
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      .range {
        margin: 0 10px;
        // -webkit-appearance: none;
        width: 250px; /* 设置宽度 */
        height: 4px; /* 设置高度 */
        border-radius: 2px;
        outline: none; /* 移除轮廓 */
        &::-webkit-slider-thumb {
          -webkit-appearance: none; /* 清除默认的浏览器样式 */
          appearance: none;
          width: 8px; /* 滑块宽度 */
          height: 8px; /* 滑块高度 */
          background: white !important; /* 滑块背景色 */
          border-radius: 50%; /* 滑块形状 */
          cursor: pointer; /* 鼠标悬停样式 */
          z-index: 1;
        }
      }
      .time {
        font-size: 12px;
        color: #999;
      }
    }
  }
  .right {
    align-items: center;
    width: 300px;
    .icon {
      &:hover {
        fill: black;
      }
      width: 30px;
      height: 30px;
      margin-left: 30px;
      fill: #999;
    }
    .sound {
      margin: 0 10px;
      width: 80px; /* 设置宽度 */
      height: 4px; /* 设置高度 */
      border-radius: 2px;
      outline: none; /* 移除轮廓 */
      margin-left: 10px;
    }
  }
  .detail {
  }
}
.wideRange {
  position: absolute;
  top: 0;
  width: 100%;
  height: 4px;
  border-radius: 2px;
}
.iconsInfo {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  .icon {
    &:hover {
      fill: white;
    }
    width: 25px;
    height: 25px;
    fill: #999;
    mix-blend-mode: difference;
    margin-left: 30px;
  }
  .rate {
    margin-left: 20px;
    font-size: 14px;
    color: #999;
  }
}
.iconPlay {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  .icon {
    &:hover {
      fill: white;
    }
    width: 25px;
    height: 25px;
    fill: #999;
    mix-blend-mode: difference;
    margin-left: 30px;
  }
}
.soundIcons {
  width: 1005;
  height: 100%;
  display: flex;
  align-items: center;
}
</style>
