<template>
  <div v-loading="loading">
    <div id="main" />
  </div>
</template>
<script>
import echarts from "echarts/lib/echarts";
// 引入饼图组件
require("echarts/lib/chart/pie");

export default {
  name: "pieChart",
  data() {
    return {
      loading: true
    };
  },
  methods: {
    setPic() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById("main"));
      let option = {
        title: {
          text: "网站功能模块访问量",
          subtext: "纯属虚构",
          left: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: ["主页", "小游戏", "小程序", "视频聊天", "其它"]
        },
        color: ["#409EFF", "#67C23A", "#E6A23C", "#909399", "#F56C6C"],
        series: [
          {
            name: "访问量",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [
              { value: 135, name: "主页" },
              { value: 310, name: "小游戏" },
              { value: 234, name: "小程序" },
              { value: 335, name: "视频聊天" },
              { value: 1548, name: "其它" }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      };
      // 绘制图表
      myChart.setOption(option);
      this.loading = false;
    }
  },
  mounted() {
    this.$nextTick(() => this.setPic());
  }
};
</script>
