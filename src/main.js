import Vue from "vue";
//import Antd from 'ant-design-vue';//全局注册组件
//import Button from 'ant-design-vue/lib/button';//按需注册组件
import {
  Button,
  Layout,
  Icon,
  Drawer,
  Radio,
  Menu,
  Form,
  Input,
  Select,
  LocaleProvider,
  Dropdown,
  DatePicker
} from "ant-design-vue"; //借助babel-plugin-import按需引入
import VueI18n from "vue-i18n";//国际化插件
import enUS from "./locale/enUS";//导入语言包
import zhCN from "./locale/zhCN";//导入语言包
import queryString from "query-string";//解析url
import Authorized from "./components/Authorized"; //引入权限控制组件
import Auth from "./directives/auth"; //引入权限指令
import App from "./App.vue";
import router from "./router";
import store from "./store";
//import 'ant-design-vue/dist/antd.less';//全局注册组件
//import 'ant-design-vue/lib/button/style'; //按需注册组件
Vue.config.productionTip = false;
//Vue.use(Antd); //全局注册组件
Vue.use(Button); //按需注册组件
Vue.use(Layout); //按需注册组件
Vue.use(Icon); //按需注册组件
Vue.use(Drawer); //按需注册组件
Vue.use(Radio); //按需注册组件
Vue.use(Menu); //按需注册组件
Vue.component("Authorized", Authorized); //全局注册
Vue.use(Auth); //注册指令
Vue.use(Form);
Vue.use(Input);
Vue.use(Select);
Vue.use(LocaleProvider);
Vue.use(Dropdown);
Vue.use(DatePicker);
Vue.use(VueI18n);
//国际化插件实例化
const i18n = new VueI18n({
  locale: queryString.parse(location.search).locale || "zhCN",  //提供一个默认语言，默认语言要从url中取，此时需要一个第三方库queryString解析url
  messages: {//配置语言包
    zhCN: { message: zhCN },
    enUS: { message: enUS }
  }
})

//引入IconFont图标库
const IconFont = Icon.createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_1646499_k0pipjh9yhs.js"
});
Vue.component("IconFont", IconFont);

new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount("#app");
