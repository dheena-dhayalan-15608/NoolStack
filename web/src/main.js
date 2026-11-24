import { i18nPlugin, setupLanguage } from "./i18n/index.js";
import { createApp } from "vue";
import { createPinia } from "pinia";
import "./styles/main.css";
import App from "./App.vue";
import { router } from "./router.js";
import { useAuth } from "./stores/auth.js";
import { useSettings } from "./stores/settings.js";

/* The language pack is applied first: it replaces course content by id before anything is drawn. */
setupLanguage().then(() => {
  const app = createApp(App);
  app.use(createPinia());
  app.use(router);
  app.use(i18nPlugin);
  useSettings();
  app.mount("#app");
  useAuth().start();
});
