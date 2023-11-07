import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import "vant/es/toast/style";
import "vant/es/dialog/style";
import pinia from "./store";

const app = createApp(App);
app.use(pinia);
app.mount("#app");
