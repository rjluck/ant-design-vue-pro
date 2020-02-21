<template>
  <div id="app">
    <!-- <a-button type="primary">Primary</a-button> -->
    <!-- <div id="nav">
      <router-link to="/dashboard/analysis">analysis</router-link>|
      <router-link to="/form">form</router-link>
    </div>-->
    <a-locale-provider :locale="locale">
      <router-view />
    </a-locale-provider>
  </div>
</template>
<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN';
import enUS from 'ant-design-vue/lib/locale-provider/en_US';
import moment from 'moment'; //默认引入的是英文的
import 'moment/locale/zh-cn'; //手动引入中文包
export default {
  data() {
    return {
      locale: zhCN
    };
  },
  watch: {
    '$route.query.locale': {
      deep: true,
      handler(val) {
        this.locale = val == 'enUS' ? enUS : zhCN;
        moment.locale(val === 'enUS' ? 'en' : 'zh-cn');
      }
    }
  }
};
</script>
<style lang="less"></style>
