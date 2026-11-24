/* Theme: follows the browser until the learner picks one. The choice is kept under "ztp-theme".
   (The language choice, "eaas-lang", is handled in src/i18n/index.js, because it has to be
   applied before anything is drawn.) */
import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const THEME_KEY = "ztp-theme";

export const useSettings = defineStore("settings", () => {
  let saved = null;
  try { const v = localStorage.getItem(THEME_KEY); if (v === "light" || v === "dark") saved = v; } catch (e) { /* storage blocked */ }
  const th = ref(saved);
  const sysDark = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;
  const sysIsDark = ref(!!(sysDark && sysDark.matches));
  if (sysDark && sysDark.addEventListener) sysDark.addEventListener("change", () => { sysIsDark.value = sysDark.matches; });

  const shownTheme = computed(() => th.value || (sysIsDark.value ? "dark" : "light"));
  function apply() {
    if (th.value) document.documentElement.setAttribute("data-theme", th.value);
    else document.documentElement.removeAttribute("data-theme");
  }
  function toggle() {
    th.value = shownTheme.value === "dark" ? "light" : "dark";
    try { localStorage.setItem(THEME_KEY, th.value); } catch (e) { /* storage blocked */ }
    apply();
  }
  apply();
  return { th, shownTheme, toggle, apply };
});
