import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./permission";

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

import "babel-polyfill";

if (process.env.NODE_ENV !== "production") require("@/mock");

Vue.config.productionTip = false;
Vue.use(ElementUI);

Promise.prototype.finally = function(fn) {
  function finFn() {
    fn.call(null);
  }
  this.then(finFn, finFn);
  return this;
};

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
