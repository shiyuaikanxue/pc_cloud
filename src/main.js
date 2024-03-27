import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
// document.addEventListener(
//   "wheel",
//   function (e) {
//     e.preventDefault();
//   },
//   { passive: false }
// );
const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.use(ElementPlus, { size: "small", zIndex: 3000 });
app.use(store);
app.use(router);
app.mount("#app");
router.push("/cloud").catch((err) => {
  // 处理导航错误
  console.error("Navigation failed", err);
});
