import Vue from "vue";
import VueRouter from "vue-router";
import NotFound from "../views/404.vue";
import Forbidden from "../views/403.vue";
//引入nprogress
import NProgress from "nprogress";
import "nprogress/nprogress.css"; //这个样式必须引入
//引入lodash/findLast
import findLast from "lodash/findLast";
//引入auth中的方法
import { check, isLogin } from "../utils/auth";
//
import { notification } from "ant-design-vue";

// import Home from "../views/Home.vue";
//import RenderRouterView from "../components/RenderRouterView.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/user",
    hideInMenu: true,
    //component: RenderRouterView, //方式1
    //component: { render: h => h("router-view") }, //方式2，template和jsx本质上都会转成render函数
    component: () => import("../layouts/UserLayout.vue"), //异步加载
    children: [
      {
        path: "/user",
        redirect: "../views/User/Login.vue" //重定向到登录页
      },
      {
        path: "/user/login",
        name: "Login",
        component: () => import("../views/User/Login.vue")
      },
      {
        path: "/user/register",
        name: "Register",
        component: () => import("../views/User/Register.vue")
      }
    ]
  },
  {
    path: "/",
    meta: { authority: ["user", "admin"] },
    component: () => import("../layouts/BasicLayout.vue"),
    children: [
      //dashboard
      {
        path: "/",
        redirect: "/dashboard/analysis"
      },
      {
        path: "/dashboard",
        name: "dashboard",
        meta: { icon: "dashboard", title: "仪表盘" },
        component: { render: h => h("router-view") },
        children: [
          {
            path: "/dashboard/analysis",
            name: "analysis",
            meta: { title: "分析页" },
            component: () => import("../views/Dashboard/Analysis")
          }
        ]
      },
      //form
      {
        path: "/form",
        name: "form",
        meta: { icon: "form", title: "表单", authority: ["admin", "user"] },
        component: { render: h => h("router-view") },
        children: [
          {
            path: "/form/basic-form",
            name: "basicform",
            meta: { title: "基础表单" },
            component: () => import("../views/Forms/BasicForm")
          },
          {
            path: "/form/step-form",
            name: "stepform",
            meta: { title: "分布表单" },
            hideChildrenInMenu: true,
            component: () => import("../views/Forms/StepForm"),
            children: [
              {
                path: "/form/step-form",
                redirect: "/form/step-form/info"
              },
              {
                path: "/form/step-form/info",
                name: "info",
                component: () => import("../views/Forms/StepForm/Step1")
              },
              {
                path: "/form/step-form/confirm",
                name: "confirm",
                component: () => import("../views/Forms/StepForm/Step2")
              },
              {
                path: "/form/step-form/result",
                name: "result",
                component: () => import("../views/Forms/StepForm/Step3")
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: "*",
    name: "403",
    hideInMenu: true,
    component: Forbidden
  },
  {
    path: "*",
    name: "404",
    hideInMenu: true,
    component: NotFound
  }
  // {
  //   path: "/",
  //   name: "Home",
  //   component: Home
  // },
  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue")
  // }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

//路由首位
router.beforeEach((to, from, next) => {
  console.log("process", process);
  if (to.path != from.path) {
    NProgress.start();
  }
  //路由权限判断>>
  const record = findLast(to.matched, record => record.meta.authority);
  if (record && !check(record.meta.authority)) {
    if (!isLogin() && to.path !== "/user/login") {
      //如果没有登录则跳转到登录页
      next({
        path: "/user/login"
      });
    } else if (to.path !== "/403") {
      //如果已经登录则跳转到403
      notification.error({
        message: "403",
        description: "你没有权限,请联系管理员."
      });
      next({
        path: "/403"
      });
    }
    NProgress.done(); //停止
  }
  //<<
  next();
});
router.afterEach((to, from) => {
  if (to.path != from.path) {
    NProgress.done();
  }
});

export default router;
