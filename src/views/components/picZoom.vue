<template>
  <div id="pic-zoom" v-loading="loading">
    <el-card class="box-card content-card">
      <div class="pic-box">
        <PicZoom :url="url" :scale="3"></PicZoom>
      </div>
    </el-card>
  </div>
</template>
<script>
import PicZoom from "vue-piczoom";
let url = require("@/assets/logo.png");

export default {
  name: "picZoom",
  data() {
    return {
      url: "",
      loading: true
    };
  },
  components: { PicZoom },
  created() {
    this.url = url;
  },
  mounted() {
    this.loading = false;
  }
};
</script>
<style lang="scss">
/* 注意：由于放大镜的显示框是添加在body下面，所以left、top是相对于body的，故要重写left、top */
.pic-box {
  height: 500px;
  width: 500px;
}

.mouse-cover-canvas {
  left: 760px !important;
  top: 90px !important;
}
</style>
