<template>
  <div class="cloud">
    <Options @switch="onSwitch" class="header" />
    <router-view></router-view>
    <!-- 不需要 to 属性 -->
  </div>
</template>

<script>
// @ is an alias to /src
import Options from "@/components/cloud/Options.vue";
import { mapMutations, mapState } from "vuex";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(["active"]),
  },
  created() {
    // 在组件创建时设置默认路由
    this.onSwitch(this.active); // 调用 onSwitch 方法以触发导航
  },
  methods: {
    ...mapMutations(["updateActive"]),
    onSwitch(option) {
      // 更新当前激活的组件
      this.updateActive(option);
      // 编程式导航到新的路由
      this.$router.push(`/cloud/${option}`);
    },
  },
  components: {
    Options,
  },
};
</script>
<style lang="less" scoped>
.cloud {
  position: relative;
  .header {
    position: sticky;
    top: 0;
    z-index: 3;
    background-color: white;
  }
}
</style>
