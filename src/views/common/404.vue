<template>
  <div id="box-404" :class="{ hasMenu: hasMenu }">
    <el-button @click="back" size="mini">返回上一页</el-button>
  </div>
</template>
<script>
export default {
  name: "page404",
  props: ["hasMenu"],
  methods: {
    back() {
      this.$router.go(-1);
    }
  }
};
</script>
<style lang="scss">
#box-404 {
  width: 100%;
  height: 100vh;
  position: relative;
  background: url("../../assets/image/404.jpg");
  background-size: 100% 100%;

  &.hasMenu {
    height: calc(100vh - 70px);
  }

  .el-button {
    position: absolute;
    color: #3a8ee6;
    border-radius: 0;
    bottom: 10%;
    left: 50%;
    letter-spacing: 2px;
    transform: translate(-50%);
  }
}
</style>
