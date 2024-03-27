<template>
  <div class="musicList">music</div>
</template>
<script>
export default {
  data() {
    return {
      id: "",
    };
  },
  computed: {},
  methods: {
    init() {
      this.getId();
    },
    getId() {
      this.id = this.$route.query.id;
      console.log(this.id);
    },
  },
  mounted() {
    this.init();
  },
};
</script>
<style lang="less" scoped></style>
