import router from "./router";
import { getToken } from "./utils/auth";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

const whiteRouteList = ["/login", "/404"];

router.beforeEach((to, from, next) => {
  NProgress.start();
  let auth = getToken("vtoken");
  if (auth && auth.length > 0) {
    let roles = to.matched.map(e => (e.meta.roles ? e.meta.roles : []));
    roles = [...new Set(roles.flat(1))];
    if (roles && roles.length > 0) {
      if (roles.some(e => auth.indexOf(e) > -1)) {
        next();
      } else {
        // 用next会报重定向的错误，暂时用router.push方法
        // next("/403");
        router.push("/403");
        NProgress.done();
      }
    } else {
      next();
    }
  } else if (whiteRouteList.indexOf(to.path) > -1) {
    next();
  } else {
    next("/login");
    NProgress.done();
  }
});

router.afterEach(() => {
  NProgress.done();
});
