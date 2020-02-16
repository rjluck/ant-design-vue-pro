<template>
  <div ref="chartDom"></div>
</template>
<script>
import echarts from "echarts";
import { addListener, removeListener } from "resize-detector";
import debounce from "lodash/debounce";
//var echarts = require('echarts');
export default {
  props: {
    options: {
      type: Object,
      default: () => {}
    }
  },
  watch: {
    // option(val) {
    //   this.chart.setOption(val);
    // }
    options: {
      //深度监听,比较耗性能
      deep: true,
      handler(val) {
        this.chart.setOption(val);
      }
    }
  },
  created() {
    //页面一改变resize方法就会被触发多次,此时可进行防抖,以提高性能
    this.resize = debounce(this.resize, 300);
  },
  mounted() {
    this.renderChart();
    /*
    注意echarts实例化的时候页面还没有渲染完成,此时
    解决方案1:延迟echarts的渲染；
    解决方案2：监听echarts容器大小变化（推荐），借助第三方库resize-detector
    */
    addListener(this.$refs.chartDom, this.resize);
  },
  beforeDestroy() {
    //当组件销毁时把这个监听事件移除掉
    removeListener(this.$refs.chartDom, this.resize);
    //当组件销毁时把echart实例销毁掉，防止内存泄漏，这也是我们封装第三方库特别注意的地方
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    resize() {
      console.log("resize");
      this.chart.resize();
    },
    renderChart() {
      // 基于准备好的dom，初始化echarts实例
      //var myChart = echarts.init(document.getElementById('main'));
      this.chart = echarts.init(this.$refs.chartDom);
      // 绘制图表
      console.log("this.options", this.options);
      this.chart.setOption(this.options);
    }
  }
};
</script>
<style></style>
