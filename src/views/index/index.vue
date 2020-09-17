<template>
  <div id="index">
    <el-row :gutter="10" class="margin-bottom-10">
      <el-col :span="24">
        <el-card class="box-card">
          <lineChart />
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="12">
        <el-card class="box-card">
          <tables />
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card">
          <pieChart />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import pieChart from "./pieChart";
import lineChart from "./lineChart";
import tables from "./tables";

// 引入提示框和图例组件
require("echarts/lib/component/title");
require("echarts/lib/component/tooltip");
require("echarts/lib/component/legend");
require("echarts/lib/component/legendScroll");

export default {
  name: "index",
  components: { pieChart, lineChart, tables }
};
</script>
<style lang="scss">
@import "@/assets/scss/common.scss";
@import "./index.scss";
</style>
