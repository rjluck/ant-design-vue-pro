function chart(method) {
  let res = null;
  switch (method) {
    case "POST":
      res = { message: "ok" };
      break;
    default:
      res = null;
  }
  return res;
}

module.exports = chart;
//这里不能使用js中的export default的形式了，因为mock文件要在node环境下运行，需要使用模块化规范
