<template>
  <div class="select">
    <Swiper :banners="state.banners" />
  </div>
</template>
<script>
import { getBanner } from "@/request/api/cloud.js";
import Swiper from "@/components/cloud/Swiper.vue";
export default {
  data() {
    return {
      state: {
        banners: [],
      },
    };
  },
  components: {
    Swiper,
  },
  methods: {
    init() {
      if (sessionStorage.getItem("select")) {
        const select = JSON.parse(sessionStorage.getItem("select")).select;
        this.state.banners = select.banners;
      } else {
        this.showBanner();
      }
    },
    showBanner: async function () {
      let res = await getBanner();
      //   console.log(res);
      this.state.banners = res.data.banners;
      const select = {
        banners: this.state.banners,
      };
      const deadline = 5 * 60 * 1000;
      sessionStorage.setItem(
        "select",
        JSON.stringify({
          select,
          deadline,
        })
      );
    },
  },
  mounted() {
    this.init();
  },
};
</script>
<style lang="less" scoped>
.select {
  width: 100%;
  height: 100%;
}
</style>
