//允许的权限
export function getCurrentAuthority() {
  return ["user"];
}

//校验权限
export function check(authority) {
  const current = getCurrentAuthority();
  return current.some(item => authority.includes(item)); //用户权限在我们允许的权限范围内，返回true,否则返回false
}

//判断登录权限,即是否已经登录
export function isLogin() {
  const current = getCurrentAuthority();
  return current && current[0] !== "guest";
}
