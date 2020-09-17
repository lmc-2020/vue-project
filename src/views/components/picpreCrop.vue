<template>
  <div>
    <el-card class="box-card content-card">
      <div class="pic-pre">
        <PicpreCrop />
      </div>
    </el-card>
  </div>
</template>
<script>
import PicpreCrop from "@/components/PicpreCrop";

export default {
  name: "picpreCrop",
  components: { PicpreCrop }
};
</script>
<style lang="scss">
.pic-pre {
  height: 400px;
}
</style>
