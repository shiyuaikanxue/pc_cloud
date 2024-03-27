<template>
  <div class="app">
    <Header />
    <Section />
    <Footer />
  </div>
</template>
<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import Section from "@/components/Section.vue";
export default {
  components: {
    Header,
    Footer,
    Section,
  },
};
</script>
<style lang="less">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.app {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  -webkit-user-select: none; /* Chrome, Safari, Android */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* 标准语法 */
  overflow-x: hidden;
  &::-webkit-scrollbar{
    display: none;
  }
}
</style>
