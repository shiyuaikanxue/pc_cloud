<template>
  <div class="header">
    <div class="headerLogo">
      <img src="@/assets/Header/Header.png" alt class="logo" />
    </div>
    <div class="headerFun">
      <HeaderSearch />
      <headerLogin />
    </div>
  </div>
</template>
<script>
import HeaderSearch from "@/components/Header/HeaderSearch.vue";
import headerLogin from "@/components/Header/HeaderLogin.vue";
export default {
  components: {
    HeaderSearch,
    headerLogin,
  },
};
</script>
<style lang="less" scoped>
.header {
  width: 100%;
  height: 60px;
  display:flex;
  align-items: center;
  flex-shrink: 0;
  .headerLogo {
    width: 200px;
    height: 100%;
    flex-shrink: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f0f3f6;
    .logo {
      width: 185px;
      height: 32px;
    }
  }
  .headerFun{
    flex: 1;
    height: 100%;
    min-width: 500px;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 0 40px;
    align-items: center;
  }
}
</style>
