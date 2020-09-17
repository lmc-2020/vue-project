<template>
  <div id="app">
    <div id="nav">
      <router-view />
    </div>
  </div>
</template>
<script>
export default {
  name: "app"
};
</script>
<style lang="scss">
@import "./assets/scss/init.scss";
@import "./assets/scss/app.scss";
@import "./assets/scss/common.scss";

::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 4px;
  /*高宽分别对应横竖滚动条的尺寸*/
  height: 4px;
}

::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #409eff;
}

::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 0;
  background: rgba(0, 0, 0, 0.1);
}
</style>
