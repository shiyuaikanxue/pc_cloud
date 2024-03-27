<template>
  <div class="musicListCovers" @click="enterMusicList()">
    <img :src="picUrl" alt="" class="backGround" />
    <div class="play">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-bofang1"></use>
      </svg>
      <span class="playCount">{{ getPlayCount }}</span>
    </div>
    <div class="info">
      <span class="name">{{ name }}</span>
      <div class="sings">
        <div
          v-for="(item, index) in songs.slice(0, 3)"
          :key="index"
          class="song"
        >
          {{ index + 1 }}
          {{ item.name }}
        </div>
      </div>
    </div>
    <div class="playIcon">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-bofang"></use>
      </svg>
    </div>
  </div>
</template>
<script>
import { getAllSongs } from "@/request/api/cloud.js";
export default {
  props: ["list"],
  data() {
    return {
      id: this.list.id,
      name: this.list.name, //歌单名字
      picUrl: this.list.coverImgUrl, //背景图片
      playCount: this.list.playCount, //播放次数
      songs: [], //歌单歌曲
    };
  },
  computed: {
    getPlayCount() {
      if (this.playCount > 100000000) {
        return (this.playCount / 100000000).toFixed(2) + "亿";
      } else if (this.playCount > 10000) {
        return (this.playCount / 10000).toFixed(2) + "万";
      }
      return this.playCount;
    },
  },
  methods: {
    init() {
      this.getSongs();
    },
    getSongs: async function () {
      const res = await getAllSongs(this.id);
      this.songs = res.data.songs;
    },
    enterMusicList() {
      this.$router.push({path:"/musicList",query:{
        id:this.list.id
      }});
    },
  },
  mounted() {
    this.init();
  },
};
</script>
<style lang="less" scoped>
.musicListCovers {
  &:hover {
    .info {
      top: 200px;
    }
    .playIcon {
      transform: scale(1);
    }
  }
  width: 280px;
  height: 330px;
  border-radius: 15px;
  overflow: hidden;
  position: relative;
  .backGround {
    width: 100%;
    height: 100%;
  }
  .play {
    position: absolute;
    top: 10px;
    right: 10px;
    display: flex;
    height: 20px;
    .icon {
      width: 20px;
      height: 20px;
      fill: white;
    }
    .playCount {
      color: white;
      mix-blend-mode: difference;
    }
  }
  .info {
    position: absolute;
    top: 270px;
    width: 100%;
    height: 130px;
    backdrop-filter: blur(100px);
    padding: 5px 15px 15px;
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .name {
      width: 100%;
      font-size: 16px;
      color: white;
    }
    .sings {
      width: 100%;
      .song {
        font-size: 12px;
        margin-top: 5px;
        color: white;
      }
    }
  }
  .playIcon {
    position: absolute;
    bottom: 20px;
    right: 20px;
    transform: scale(0);
    transition: all 0.3s ease;
    .icon {
      width: 50px;
      height: 50px;
      fill: white;
      color: white;
    }
  }
}
</style>
