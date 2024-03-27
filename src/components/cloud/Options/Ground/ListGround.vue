<template>
  <div class="listGround">
    <span class="title">{{ title + "歌单" }}</span>
    <div class="list">
      <MusicListCovers v-for="list in value" :key="list.id" :list="list"></MusicListCovers>
    </div>
  </div>
</template>
<script>
import MusicListCovers from "../../MusicListCovers.vue";
export default {
  components: {
    MusicListCovers,
  },
  props: ["title", "value"],
  mounted() {},
};
</script>
<style lang="less" scoped>
.listGround {
  width: 100%;
  padding: 0 30px;
  .title {
    display: inline-block;
    margin: 10px 0;
    font-size: 20px;
    font-weight: 600;
  }
  .list{
    display: grid;
    grid-template-columns: repeat(6,280px);
    grid-template-rows: 330px;
    grid-gap: 20px;
  }
}
</style>
