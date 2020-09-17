<template>
  <div v-loading="loading">
    <div id="mainLine" />
  </div>
</template>
<script>
import echarts from "echarts/lib/echarts";
// 引入线形图、柱形图组件
require("echarts/lib/chart/line");
require("echarts/lib/chart/bar");

export default {
  name: "lineChart",
  data() {
    return {
      loading: true
    };
  },
  methods: {
    setPic() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById("mainLine"));
      let option = {
        title: {
          text: "用户统计",
          left: "left"
        },
        grid: {
          left: "60px",
          bottom: "20px",
          right: "60px"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999"
            }
          }
        },
        legend: {
          data: ["超级会员", "会员用户", "普通用户", "当月流量"]
        },
        xAxis: [
          {
            type: "category",
            data: [
              "1月",
              "2月",
              "3月",
              "4月",
              "5月",
              "6月",
              "7月",
              "8月",
              "9月",
              "10月",
              "11月",
              "12月"
            ],
            axisPointer: {
              type: "shadow"
            }
          }
        ],
        color: ["#67C23A", "#409EFF", "#E6A23C", "#F56C6C"],
        yAxis: [
          {
            type: "value",
            name: "访问量",
            axisLabel: {
              formatter: "{value} 人"
            }
          },
          {
            type: "value",
            name: "流量",
            splitLine: {
              show: false
            },
            axisLabel: {
              formatter: "{value} GB"
            }
          }
        ],
        series: [
          {
            name: "超级会员",
            type: "bar",
            data: [200, 300, 205, 600, 864, 652, 310, 529, 620, 550, 440, 720]
          },
          {
            name: "会员用户",
            type: "bar",
            data: [300, 330, 405, 400, 364, 252, 510, 429, 220, 850, 640, 520]
          },
          {
            name: "普通用户",
            type: "bar",
            data: [
              800,
              930,
              1205,
              1100,
              1064,
              1252,
              1510,
              1429,
              1220,
              850,
              1640,
              1520
            ]
          },
          {
            name: "当月流量",
            type: "line",
            yAxisIndex: 1,
            smooth: true,
            data: [
              2.6,
              15.9,
              19.0,
              26.4,
              28.7,
              30.7,
              75.6,
              82.2,
              48.7,
              58.8,
              36.0,
              45.3
            ]
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
