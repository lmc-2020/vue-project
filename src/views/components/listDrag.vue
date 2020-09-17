<template>
  <div>
    <el-card class="box-card content-card">
      <el-row :gutter="24">
        <el-col :span="12">
          <div class="list-title">list1</div>
          <ul
            class="list-ul"
            @dragstart="onDragStart"
            @dragover="onDragOver"
            @dragend="onDragEnd"
            ref="parentNode1"
            id="parentNode1"
          >
            <li
              v-for="item in list1"
              class="list-li"
              v-text="item"
              draggable="true"
              :key="item"
            ></li>
          </ul>
        </el-col>
        <el-col :span="12">
          <div class="list-title">list2</div>
          <ul
            class="list-ul"
            @dragstart="onDragStart"
            @dragover="onDragOver"
            @dragend="onDragEnd"
            ref="parentNode2"
            id="parentNode2"
          >
            <li
              v-for="item in list2"
              class="list-li"
              v-text="item"
              draggable="true"
              :key="item"
            ></li>
          </ul>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script>
export default {
  name: "listDrag",
  data() {
    return {
      list1: [
        "左边列表数据1",
        "左边列表数据2",
        "左边列表数据3",
        "左边列表数据4",
        "左边列表数据5",
        "左边列表数据6",
        "左边列表数据7",
        "左边列表数据8"
      ],
      list2: [
        "右边列表数据1",
        "右边列表数据2",
        "右边列表数据3",
        "右边列表数据4",
        "右边列表数据5",
        "右边列表数据6",
        "右边列表数据7",
        "右边列表数据8"
      ],
      draging: null,
      target: null,
      result1: [],
      result2: []
    };
  },
  methods: {
    onDragStart(event) {
      this.draging = event.target;
      this.draging.style = "background: #409eff";
    },
    onDragOver(event) {
      this.target = event.target;
      if (this.target.nodeName === "LI" && this.target !== this.draging) {
        if (
          this.getIndex(this.draging, this.draging.parentNode.id) <
          this.getIndex(this.target, this.target.parentNode.id)
        ) {
          this.target.parentNode.insertBefore(
            this.draging,
            this.target.nextSibling
          );
        } else {
          this.target.parentNode.insertBefore(this.draging, this.target);
        }
      }
    },
    onDragEnd() {
      let temp = Array.from(this.$refs.parentNode1.childNodes);
      this.result1 = temp.map(i => i.innerText);
      temp = Array.from(this.$refs.parentNode2.childNodes);
      this.result2 = temp.map(i => i.innerText);
      this.draging.style = "background: none";
      console.log(this.result1, this.result2);
    },
    getIndex(el, id) {
      let domData = Array.from(this.$refs[id].childNodes);
      return domData.findIndex(i => i.innerText == el.innerText);
    }
  }
};
</script>
<style lang="scss" scoped>
.list-title {
  font-size: 20px;
  font-weight: 700;
  padding-bottom: 10px;
}

.list-ul {
  height: calc(100vh - 165px);
}

.list-li {
  padding: 5px 10px;
  border: 1px solid #999;
  margin-bottom: 5px;
  cursor: move;
}
</style>
