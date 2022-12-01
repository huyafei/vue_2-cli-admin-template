import Vue from "vue";

import Cookies from "js-cookie";

import "normalize.css/normalize.css"; // a modern alternative to CSS resets

import Element from "element-ui";
import "./assets/styles/element-variables.scss";

import "@/assets/styles/index.scss"; // global css

import App from "./App";
import store from "./store";
import router from "./router";

import i18n from "./lang"; // internationalization
import "./icons"; // icon
import "./permission"; // permission control

/**
 * 如果您不想使用模拟服务器
 * 你想用MockJs来模拟api可以执行:mockXHR()
 * 请在上线前删除!!!
 */
const { mockXHR } = require("../mock");
console.log(process.env);
if (["development"].includes(process.env.VUE_APP_PROJECT_ENV)) {
  mockXHR();
}

Vue.use(Element, {
  size: Cookies.get("size") || "medium", // set element-ui default size
  i18n: (key, value) => i18n.t(key, value),
});

Vue.config.productionTip = false;

new Vue({
  el: "#app",
  router,
  store,
  i18n,
  render: (h) => h(App),
});
