<template>
  <div class="lyric">
    <p class="songName">{{ playlist[playlistIndex].name }}</p>
    <p class="songInfo">
      <span class="info"
        >专辑 {{ ": " + playlist[playlistIndex].al.name }}</span
      >
      <span class="info"
        >歌手
        <span>{{ ": " + playlist[playlistIndex].ar[0].name }}</span>
        <span
          v-for="person in playlist[playlistIndex].ar.slice(
            1,
            playlist[playlistIndex].ar.length
          )"
          :key="person.id"
        >
          {{ "/" + person.name }}
        </span>
      </span>
    </p>
    <div class="content" @scroll="handleScroll()" ref="musicLyric">
      <div class="space"></div>
      <p
        v-for="item in lyric"
        @click="clickSkip(item.time / 1000)"
        class="words"
        :key="item"
        :class="{
          p_active:
            currentTime * 1000 >= item.time && currentTime * 1000 < item.pre,
        }"
      >
        {{ item.lyr }}
      </p>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      timer: null,  //开始播放，设置定时器抓住歌词
      time:null,  //如果滚动歌词，则清空定时器，5秒之后重新设置定时器，如果继续滚动，则重置5秒
    };
  },
  props: ["isbtnShow"],
  computed: {
    ...mapState(["lyricList", "playlist", "playlistIndex", "currentTime"]),
    lyric: function () {
      let arr;
      if (this.lyricList.lyric) {
        arr = this.lyricList.lyric.split(/[(\r\n)\r\n]+/).map((item, index) => {
          let min = item.slice(1, 3);
          let sec = item.slice(4, 6);
          let ms = item.slice(7, 10);
          let lyr = item.slice(11);
          if (isNaN(Number(ms))) {
            ms = item.slice(7, 9);
            lyr = item.slice(10);
          }
          let time =
            parseInt(min * 60 * 1000) + parseInt(sec * 1000) + parseInt(ms);
          return { min, sec, ms, lyr, time };
        });
        for (let i = 0; i < arr.length - 1; i++) {
          if (i == arr.length - 2) {
            arr[i].pre = arr[i].time * 10;
          } else {
            arr[i].pre = arr[i + 1].time;
          }
        }
      }
      return arr;
    },
  },
  methods: {
    clickSkip(value) {
      console.log(value);
      this.$emit("skips", value);
    },
    handleScroll() {
      if(this.time){
        clearTimeout(this.time)
      }
      if(this.timer){
        clearInterval(this.timer)
      }
      this.time = setTimeout(()=>{
        this.timer = setInterval(()=>[
          this.scroll()
        ])
      },5000)
    },
    scroll() {
      let p_active = document.querySelector(".p_active");
      if (p_active) {
        if (p_active.offsetTop > 550) {
          this.$refs.musicLyric.scrollTop = p_active.offsetTop - 550;
          console.log(this.$refs.musicLyric.scrollTop)
        }
      }
    },
  },
  watch: {
    currentTime: function (newtime) {
      if (newtime == this.duration) {
        this.goplay(1);
      }
    },
    isbtnShow: function (value) {
      if (value == false) {
        if(this.timer){
          clearInterval(this.timer)
        }
        this.timer = setInterval(() => {
          this.scroll()
        }, 200);
      }
      if(value == true){  //结束播放，则清空所有定时器
        if(this.time){
          clearTimeout(this.time)
        }
        if(this.timer){
          clearInterval(this.timer)
        }
      }
    },
  },
};
</script>
<style lang="less" scoped>
.lyric {
  height: 100%;
  width: 100%;
  overflow: hidden;
  .songName {
    font-size: 24px;
    color: white;
  }
  .songInfo {
    margin-top: 20px;
    .info {
      font-size: 14px;
      color: #999;
      margin-right: 20px;
    }
  }
  .content {
    .space {
      height: 40%;
      width: 100%;
    }
    &::-webkit-scrollbar {
      display: none;
    }
    margin-top: 20px;
    width: 100%;
    height: 850px;
    overflow: auto;
    .words {
      font-size: 20px;
      color: #999;
      margin: 25px 0;
    }
    .p_active {
      color: white;
      font-size: 24px;
    }
  }
}
</style>
