<template>
  <div>
    {{$t('message')['app.dashboard.analysis.timeLabel']}}
    <a-date-picker></a-date-picker>
    <Chart
      :options="chartOption"
      style="height:400px"
    />
    <pre v-highlightjs="chartCode"><code class="html"></code></pre>
  </div>
</template>
<script>
import Chart from '../../components/Chart';
import request from '../../utils/request';
// import random from 'lodash/random';
// import axios from 'axios';
import chartCode from '!!raw-loader!../../components/Chart';

export default {
  components: {
    Chart
  },
  data() {
    return {
      chartCode,
      chartOption: {
        // title: {
        //   text: 'ECharts 入门示例'
        // },
        // tooltip: {},
        // xAxis: {
        //   data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        // },
        // yAxis: {},
        // series: [
        //   {
        //     name: '销量',
        //     type: 'bar',
        //     data: [5, 20, 36, 10, 10, 20]
        //   }
        // ]
      }
    };
  },
  mounted() {
    this.getChartData(); //调用接口
    this.interval = setInterval(() => {
      this.getChartData(); //调用接口
      // //random(100) 含义：100以内的随机数
      // this.chartOption.series[0].data = this.chartOption.series[0].data.map(() => random(100));
      // console.log('999', this.chartOption.series[0].data);
      // //非深度监听可以用此方法
      // this.chartOption = { ...this.chartOption };
    }, 3000);
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
  methods: {
    getChartData() {
      //
      request({
        url: '/api/dashboard/chart',
        method: 'get',
        params: {
          ID: 6666
        }
      }).then(response => {
        console.log('response', response);
        this.chartOption = {
          title: {
            text: 'ECharts 入门示例'
          },
          tooltip: {},
          xAxis: {
            data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
          },
          yAxis: {},
          series: [
            {
              name: '销量',
              type: 'bar',
              data: response.data
            }
          ]
        };
      });
      //
      // axios.get('/api/dashboard/chart', { params: { ID: 12345 } }).then(response => {
      //   console.log('response', response);
      //   this.chartOption = {
      //     title: {
      //       text: 'ECharts 入门示例'
      //     },
      //     tooltip: {},
      //     xAxis: {
      //       data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
      //     },
      //     yAxis: {},
      //     series: [
      //       {
      //         name: '销量',
      //         type: 'bar',
      //         data: response.data
      //       }
      //     ]
      //   };
      // });
    }
  }
};
</script>
<style></style>
