import Vue from "vue";
import VueRouter from "vue-router";
import NotFound from "../views/404.vue";
//引入nprogress
import NProgress from "nprogress";
import "nprogress/nprogress.css"; //这个样式必须引入

// import Home from "../views/Home.vue";
//import RenderRouterView from "../components/RenderRouterView.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/user",
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
        component: { render: h => h("router-view") },
        children: [
          {
            path: "/dashboard/analysis",
            name: "analysis",
            component: () => import("../views/Dashboard/Analysis")
          }
        ]
      },
      //form
      {
        path: "/form",
        name: "form",
        component: { render: h => h("router-view") },
        children: [
          {
            path: "/form/basic-form",
            name: "basicform",
            component: () => import("../views/Forms/BasicForm")
          },
          {
            path: "/form/step-form",
            name: "stepform",
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
    name: "404",
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
router.beforeEach((to, form, next) => {
  NProgress.start();
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
