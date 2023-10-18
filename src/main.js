import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "./assets/custom.css";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

createApp(App).use(store).use(Toast).use(router).mount("#app");
