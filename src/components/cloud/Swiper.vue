<template>
  <div class="swiper">
    <el-carousel
      :interval="5000"
      type="card"
      indicator-position="none"
      trigger="click"
    >
      <el-carousel-item v-for="item in banners" :key="item.name">
        <img :src="item.imageUrl" alt="" class="banner" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script>
export default {
  props: ["banners"],
  mounted() {},
};
</script>
<style lang="less" scoped>
.swiper {
  padding: 0 30px;
  width: 100%;
  height: 40vh;
  border-radius: 20px;
  .el-carousel__mask{
    border-radius: 20px;
  }
  .banner {
    height: 100%;
    width: 100%;
    border-radius: 20px;
  }
}
</style>
