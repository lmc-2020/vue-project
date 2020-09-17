<template>
  <div id="pic-pre" v-loading="loading" class="not-select">
    <el-row :gutter="24">
      <el-col :span="12">
        <div class="imgbox">
          <img id="pic" />
          <div class="crop-box" :class="{ active: hasImg }">
            <div
              class="left common"
              style="height: 100%"
              :style="{ width: x + '%' }"
            ></div>
            <div
              class="top common"
              :style="{
                width: m - x + '%',
                height: y + '%',
                left: x + '%'
              }"
            ></div>
            <div
              class="right common"
              style="height: 100%; right: 0"
              :style="{ width: 100 - m + '%' }"
            ></div>
            <div
              class="bottom common"
              :style="{
                width: m - x + '%',
                height: 100 - n + '%',
                bottom: 0,
                left: x + '%'
              }"
            ></div>
            <div
              class="center common"
              @mousedown.stop="setParam($event, 'center')"
              :style="{
                width: m - x + '%',
                height: n - y + '%',
                left: x + '%',
                top: y + '%'
              }"
            ></div>
            <div
              class="left-top common"
              @mousedown.stop="setParam($event, 'left-top')"
              :style="{ left: x + '%', top: y + '%' }"
            ></div>
            <div
              class="top-center common"
              @mousedown.stop="setParam($event, 'top')"
              style="transform: translateX(-50%)"
              :style="{
                left: (m - x) / 2 + x + '%',
                top: y + '%'
              }"
            ></div>
            <div
              class="right-top common"
              @mousedown.stop="setParam($event, 'right-top')"
              style="transform: translateX(-100%)"
              :style="{ left: m + '%', top: y + '%' }"
            ></div>
            <div
              class="right-center common"
              @mousedown.stop="setParam($event, 'right')"
              style="transform: translate(-100%, -50%)"
              :style="{
                left: m + '%',
                top: (n - y) / 2 + y + '%'
              }"
            ></div>
            <div
              class="right-bottom common"
              @mousedown.stop="setParam($event, 'right-bottom')"
              style="transform: translate(-100%, -100%)"
              :style="{ left: m + '%', top: n + '%' }"
            ></div>
            <div
              class="bottom-center common"
              @mousedown.stop="setParam($event, 'bottom')"
              style="transform: translate(-50%, -100%)"
              :style="{
                left: (m - x) / 2 + x + '%',
                top: n + '%'
              }"
            ></div>
            <div
              class="left-bottom common"
              @mousedown.stop="setParam($event, 'left-bottom')"
              style="transform: translateY(-100%)"
              :style="{ left: x + '%', top: n + '%' }"
            ></div>
            <div
              class="left-center common"
              @mousedown.stop="setParam($event, 'left')"
              style="transform: translateY(-50%)"
              :style="{
                left: x + '%',
                top: (n - y) / 2 + y + '%'
              }"
            ></div>
          </div>
        </div>
        <input type="file" id="file" style="display: none" @change="change" />
        <el-button @click="clickButton" size="mini">选择图片</el-button>
        <el-button @click="getPosition" size="mini" v-if="hasImg"
          >确认裁剪</el-button
        >
      </el-col>
      <el-col :span="12">
        <div class="canvas-box">
          <canvas id="canvas" ref="canvas" width="100%" height="100%" />
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: "Picpre",
  data() {
    return {
      loading: true,
      hasImg: false,
      imgFormat: ["png", "jpg", "jpeg"],
      position: [25, 25, 75, 75],
      x: 25,
      y: 25,
      m: 75,
      n: 75,
      isDown: false,
      startX: 0,
      startY: 0,
      box: { width: 0, height: 0 },
      param: "center",
      imgUrl: ""
    };
  },
  methods: {
    clickButton() {
      document.getElementById("file").click();
    },
    change() {
      let pic = document.getElementById("pic"),
        file = document.getElementById("file");
      let ext = file.value
        .substring(file.value.lastIndexOf(".") + 1)
        .toLowerCase();
      if (ext === "") {
        return;
      }
      if (this.imgFormat.indexOf(ext) < 0) {
        this.$message.error(
          `图片的格式必须为${this.imgFormat.join("、")}格式！`
        );
        this.hasImg = false;
        return;
      }
      this.hasImg = true;
      this.setUrl(pic, file);
    },
    setUrl(pic, file) {
      if (navigator.userAgent.match(/MSIE/) != null) {
        file.select();
        let reallocalpath = document.selection.createRange().text;
        pic.style.filter =
          "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='image',src=\"" +
          reallocalpath +
          '")';
        pic.src =
          "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==";
        this.imgUrl = pic.src;
      } else {
        let reader = new FileReader();
        let that = this;
        reader.readAsDataURL(file.files[0]);
        reader.onload = function() {
          pic.src = this.result;
          that.imgUrl = this.result;
        };
      }
    },
    getPosition() {
      let canvas = this.$refs["canvas"];
      let cxt = canvas.getContext("2d");
      let img = new Image();
      img.src = this.imgUrl;
      img.onload = () => {
        let sx = (this.position[0] / 100) * img.width;
        let sy = (this.position[1] / 100) * img.height;
        let sw = ((this.position[2] - this.position[0]) / 100) * img.width;
        let sh = ((this.position[3] - this.position[1]) / 100) * img.height;
        cxt.drawImage(img, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);
      };
    },
    setParam(e, p) {
      this.startX = e.clientX;
      this.startY = e.clientY;
      this.isDown = true;
      this.param = p;
    },
    setPosition(e) {
      if (!this.isDown) {
        return;
      }

      let nx = e.clientX;
      let ny = e.clientY;

      let tx = ((nx - this.startX) / this.box.width) * 100;
      let ty = ((ny - this.startY) / this.box.height) * 100;

      switch (this.param) {
        case "center":
          this.setCenter(tx, ty);
          break;
        case "left":
          this.setLeft(tx);
          break;
        case "left-top":
          this.setLeftTop(tx, ty);
          break;
        case "top":
          this.setTop(ty);
          break;
        case "right-top":
          this.setRightTop(tx, ty);
          break;
        case "right":
          this.setRight(tx);
          break;
        case "right-bottom":
          this.setRightBottom(tx, ty);
          break;
        case "bottom":
          this.setBottom(ty);
          break;
        case "left-bottom":
          this.setLeftBottom(tx, ty);
          break;
      }

      this.x = this.x >= this.m ? this.m : this.x;
      this.y = this.y >= this.n ? this.n : this.y;
    },
    setCenter(tx, ty) {
      let tempx = this.position[0] + tx;
      let tempy = this.position[1] + ty;
      let tempm = this.position[2] + tx;
      let tempn = this.position[3] + ty;

      if (tempx >= 0 && tempm <= 100) {
        this.x = this.position[0] + tx;
        this.m = this.position[2] + tx;
      } else if (this.position[0] + tx < 0) {
        this.x = 0;
      } else {
        this.m = 100;
      }
      if (tempy >= 0 && tempn <= 100) {
        this.y = this.position[1] + ty;
        this.n = this.position[3] + ty;
      } else if (this.position[1] + ty < 0) {
        this.y = 0;
      } else {
        this.n = 100;
      }
    },
    setLeft(tx) {
      let tempx = this.position[0] + tx;
      this.x = tempx < 0 ? 0 : tempx;
    },
    setLeftTop(tx, ty) {
      let tempx = this.position[0] + tx;
      let tempy = this.position[1] + ty;
      this.x = tempx < 0 ? 0 : tempx;
      this.y = tempy < 0 ? 0 : tempy;
    },
    setTop(ty) {
      let tempy = this.position[1] + ty;
      this.y = tempy < 0 ? 0 : tempy;
    },
    setRightTop(tx, ty) {
      let tempy = this.position[1] + ty;
      let tempm = this.position[2] + tx;
      this.y = tempy < 0 ? 0 : tempy;
      this.m = tempm > 100 ? 100 : tempm;
    },
    setRight(tx) {
      let tempm = this.position[2] + tx;
      this.m = tempm > 100 ? 100 : tempm;
    },
    setRightBottom(tx, ty) {
      let tempm = this.position[2] + tx;
      let tempn = this.position[3] + ty;
      this.m = tempm > 100 ? 100 : tempm;
      this.n = tempn > 100 ? 100 : tempn;
    },
    setBottom(ty) {
      let tempn = this.position[3] + ty;
      this.n = tempn > 100 ? 100 : tempn;
    },
    setLeftBottom(tx, ty) {
      let tempx = this.position[0] + tx;
      let tempn = this.position[3] + ty;
      this.x = tempx < 0 ? 0 : tempx;
      this.n = tempn > 100 ? 100 : tempn;
    }
  },
  mounted() {
    this.loading = false;
    let dom = document.getElementById("pic");
    this.box.width = dom.clientWidth;
    this.box.height = dom.clientHeight;
    this.$refs.canvas.width = this.box.width;
    this.$refs.canvas.height = this.box.height;
    document.getElementById("app").onmouseup = () => {
      this.isDown = false;
      this.position = [this.x, this.y, this.m, this.n];
    };
    document.getElementById("app").onmousemove = e => {
      this.setPosition(e);
    };
  },
  beforeDestroy() {
    document.getElementById("app").onmouseup = null;
    document.getElementById("app").onmousemove = null;
  }
};
</script>
<style lang="scss" scoped>
#pic-pre {
  height: 100%;

  .el-button {
    margin-top: 10px;
  }

  .el-row,
  .el-col {
    height: 100%;
  }
}

.canvas-box {
  height: 400px;
}

#canvas {
  box-sizing: border-box;
  border: 1px solid #999;
}

.imgbox {
  width: 100%;
  height: 100%;
  position: relative;

  .crop-box {
    position: absolute;
    visibility: hidden;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 1px solid rgba(0, 0, 0, 0);

    &.active {
      visibility: visible;
    }

    .common {
      position: absolute;
    }

    .left,
    .right,
    .top,
    .bottom {
      background: rgba(0, 0, 0, 0.3);
    }

    .center {
      border: 1px #333 dashed;
      box-sizing: border-box;
      cursor: move;
    }

    .left-top,
    .left-center,
    .left-bottom,
    .bottom-center,
    .right-bottom,
    .right-center,
    .right-top,
    .top-center {
      width: 6px;
      height: 6px;
      // background: rgba(255, 255, 255, 0.6);
      background: #02b6ec;
      position: absolute;
    }

    .left-top {
      cursor: nw-resize;
    }

    .left-center {
      cursor: w-resize;
    }

    .left-bottom {
      cursor: sw-resize;
    }

    .bottom-center {
      cursor: s-resize;
    }

    .right-bottom {
      cursor: se-resize;
    }

    .right-center {
      cursor: e-resize;
    }

    .right-top {
      cursor: ne-resize;
    }

    .top-center {
      cursor: n-resize;
    }
  }
}

#pic {
  width: 100%;
  height: 100%;
  border: 1px solid #eee;
  transition: color 0.2s ease;

  &:hover {
    border-color: #409eff;
  }
}
</style>
