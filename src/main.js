import Vue from "vue";
//import Antd from 'ant-design-vue';//全局注册组件
//import Button from 'ant-design-vue/lib/button';//按需注册组件
import { Button } from "ant-design-vue"; //借助babel-plugin-import按需引入
import App from "./App.vue";
import router from "./router";
import store from "./store";
//import 'ant-design-vue/dist/antd.less';//全局注册组件
//import 'ant-design-vue/lib/button/style'; //按需注册组件
Vue.config.productionTip = false;
//Vue.use(Antd); //全局注册组件
Vue.use(Button); //按需注册组件
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
