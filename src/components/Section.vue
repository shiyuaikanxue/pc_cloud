<template>
  <div class="section">
    <SectionSide />
    <router-view class="screen" />
  </div>
</template>
<script>
import SectionSide from "@/components/SectionSide.vue";
export default {
  components: {
    SectionSide,
  },
};
</script>
<style lang="less" scoped>
.section {
  flex-grow: 1;
  width: 100%;
  display: flex;
  overflow: hidden;
  .screen {
    flex: 1;
    height: 100%;
    overflow: hidden scroll;
    &::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>
