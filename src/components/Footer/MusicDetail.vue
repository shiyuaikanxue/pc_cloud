<template>
  <div class="musicDetail">
    <img :src="song.al.picUrl" alt="" class="backImg" />
    <div class="header">
      <div class="left">
        <el-button class="fold" @click="close()"
          ><svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-xiangxia"></use></svg
        ></el-button>
      </div>
      <div class="right"></div>
    </div>
    <div class="section">
      <div class="left">
        <img
          src="@/assets/MusicDetail/needle-ab.png"
          alt=""
          class="needle"
          :class="{ needleActive: !isbtnShow }"
        />
        <img src="@/assets/MusicDetail/disc-plus.png" alt="" class="dist" />
        <img
          :src="song.al.picUrl"
          alt=""
          class="cover"
          :class="{ img_ar_run: !isbtnShow, img_ar_paused: isbtnShow }"
        />
      </div>
      <div class="right">
        <Lyric @skips="convey" :isbtnShow="isbtnShow"></Lyric>
      </div>
    </div>
    <div class="footer">
      <slot name="range"></slot>
      <div class="left">
        <slot name="iconInfo"></slot>
      </div>
      <div class="middle">
        <slot name="iconPlay"></slot>
      </div>
      <div class="right">
        <slot name="sound"></slot>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import Lyric from "@/components/Footer/Lyric.vue";
export default {
  computed: {},
  data() {
    return {};
  },
  components: {
    Lyric,
  },
  computed: {
    ...mapState(["isbtnShow"]),
  },
  props: ["song"],
  methods: {
    close() {
      this.$emit("fold");
    },
    init: function () {},
    convey(value){
      this.$emit('skip',value)
    }
  },
  mounted() {
    this.init();
  },
};
</script>
<style lang="less" scoped>
.musicDetail {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  .backImg {
    width: 100%;
    height: 100%;
    z-index: -1;
    position: absolute;
    filter: blur(100px);
  }
  .header {
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      height: 100%;
      width: 120px;
      display: flex;
      align-items: center;
      padding: 20px 40px;
      .fold {
        width: 40px;
        height: 40px;
        background-color: rgba(white, 0.1);
        border: 2px solid rgba(9, 9, 9, 0.1);
        border-radius: 5px;
        .icon {
          width: 25px;
          height: 25px;
          fill: black;
          //   fill: white;
        }
      }
    }
    .right {
      height: 100%;
      width: 320px;
    }
  }
  .section {
    width: 100%;
    height: 1000px;
    display: flex;
    .left,
    .right {
      height: 100%;
      width: 50%;
    }
    .left {
      position: relative;
      .needle {
        position: absolute;
        top: 100px;
        left: 50%;
        width: 200px;
        height: 350px;
        transform-origin: 30px 30px;
        transform: rotate(-45deg);
        transition: all 1.5s ease;
        z-index: 1;
      }
      .needleActive {
        transform: rotate(-18deg);
      }
      .dist {
        position: absolute;
        top: 200px;
        left: 20%;
        width: 700px;
        height: 700px;
      }
      .cover {
        position: absolute;
        width: 450px;
        height: 450px;
        border-radius: 50%;
        top: 328px;
        left: 328px;
        animation: img_rotate 15s linear 0.5s infinite;
      }
      .img_ar_run {
        animation-play-state: running;
      }
      .img_ar_paused {
        animation-play-state: paused;
      }
      @keyframes img_rotate {
        0% {
          transform: rotateZ(0deg);
        }
        100% {
          transform: rotateZ(360deg);
        }
      }
    }
    .right {
      overflow: hidden;
    }
  }
  .footer {
    height: 80px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    .left {
      height: 100%;
      width: 350px;
    }
    .middle {
      height: 100%;
      width: 300px;
    }
    .right {
      height: 100%;
      width: 300px;
    }
  }
}
</style>
