<script setup>
import { computed, watch, watchEffect } from "vue";
import { useRoute } from "vue-router";
import SiteHeader from "./components/SiteHeader.vue";
import SiteFooter from "./components/SiteFooter.vue";
import CourseSidebar from "./components/CourseSidebar.vue";
import Toast from "./components/Toast.vue";
import PartyPoppers from "./components/PartyPoppers.vue";
import LanguageChooser from "./components/LanguageChooser.vue";
import { routeItem } from "./router.js";
import { useProgress, courseOf, course } from "./stores/progress.js";
import { useAuth } from "./stores/auth.js";
import { crForget } from "./services/debugdesk.js";
import { sideUI } from "./components/sideUI.js";

const route = useRoute();
const progress = useProgress();
const auth = useAuth();

/* A lesson, checkpoint or project shows the course sidebar, opened at its section. */
const item = computed(() => routeItem(route));
watch(item, it => {
  if (!it) return;
  const c = courseOf(it);
  progress.curCourse = c;
  progress.openSec.add(c + ":" + course(c).sections.findIndex(s => s.ids.includes(it)));
}, { immediate: true });
watchEffect(() => { document.body.classList.toggle("course", !!item.value); });
/* the phone-width lesson list closes on every page change */
watch(() => route.fullPath, () => { sideUI.show = false; });

/* Signing in or out: Debug Desk has to check again who has joined. */
watch(() => auth.userVersion, () => { crForget(); });
</script>

<template>
  <SiteHeader />
  <div class="shell">
    <CourseSidebar />
    <main id="main" tabindex="-1">
      <RouterView :key="route.fullPath" />
    </main>
  </div>
  <SiteFooter />
  <Toast />
  <PartyPoppers />
  <LanguageChooser />
</template>
