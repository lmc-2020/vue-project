<template>
  <div id="img-crop">
    <div class="crop-btn" @click="toggleShow">选择图片</div>
    <myUpload
      field="img"
      @crop-success="cropSuccess"
      @crop-upload-success="cropUploadSuccess"
      @crop-upload-fail="cropUploadFail"
      v-model="show"
      :width="300"
      :height="300"
      :params="params"
      :headers="headers"
      img-format="png"
    ></myUpload>
    <template v-if="imgDataUrl">
      <img class="crop-img" :src="imgDataUrl" />
    </template>
  </div>
</template>
<script>
import "babel-polyfill"; // es6 shim
import myUpload from "vue-image-crop-upload";

export default {
  name: "imageCrop",
  data() {
    return {
      show: false,
      params: {
        token: "123456798",
        name: "avatar"
      },
      headers: {
        smail: "*_~"
      },
      imgDataUrl: "" // the datebase64 url of created image
    };
  },
  components: { myUpload },
  methods: {
    toggleShow() {
      this.show = !this.show;
    },
    /**
     * crop success
     *
     * [param] imgDataUrl
     * [param] field
     */
    cropSuccess(imgDataUrl, field) {
      console.log("-------- crop success --------", field);
      this.imgDataUrl = imgDataUrl;
    },
    /**
     * upload success
     *
     * [param] jsonData  server api return data, already json encode
     * [param] field
     */
    cropUploadSuccess(jsonData, field) {
      console.log("-------- upload success --------");
      console.log(jsonData);
      console.log("field: " + field);
    },
    /**
     * upload fail
     *
     * [param] status    server api return error status, like 500
     * [param] field
     */
    cropUploadFail(status, field) {
      console.log("-------- upload fail --------");
      console.log(status);
      console.log("field: " + field);
    }
  }
};
</script>
<style lang="scss" scoped>
.crop-btn {
  cursor: pointer;

  &:hover {
    color: #409eff;
  }
}
/deep/.vicp-close {
  display: none;
}
.crop-img {
  width: 80%;
  max-width: 500px;
  max-height: 500px;
  margin-top: 10px;
}
</style>
