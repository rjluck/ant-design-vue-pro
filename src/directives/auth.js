import { check } from "../utils/auth";
//权限指令弊端：只有第一次加载好用，若是动态改变权限则不好用，一般使用中不会动态变化
//自动注册引用的方法
function install(Vue, options = {}) {
  Vue.directive(options.name || "auth", {
    inserted(el, binding) {
      if (!check(binding.value)) {
        el.parentNode && el.parentNode.removeChild(el);
      }
    }
  });
}

export default { install };
