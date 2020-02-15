<template>
  <div>
    <Chart :options="chartOption" style="height:400px" />
  </div>
</template>
<script>
import Chart from "../../components/Chart";
import random from "lodash/random";
export default {
  components: {
    Chart
  },
  data() {
    return {
      chartOption: {
        title: {
          text: "ECharts 入门示例"
        },
        tooltip: {},
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      }
    };
  },
  mounted() {
    this.interval = setInterval(() => {
      //random(100) 含义：100以内的随机数
      this.chartOption.series[0].data = this.chartOption.series[0].data.map(
        () => random(100)
      );
      console.log("999", this.chartOption.series[0].data);
      //非深度监听可以用此方法
      this.chartOption = { ...this.chartOption };
    }, 3000);
  },
  beforeDestroy() {
    clearInterval(this.interval);
  }
};
</script>
<style></style>
