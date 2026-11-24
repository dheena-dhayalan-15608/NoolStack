<script setup>
import { ref, computed, watch, nextTick, onMounted, onBeforeUnmount } from "vue";
import { useRoute } from "vue-router";
import ThemeToggle from "./ThemeToggle.vue";
import { useProgress } from "../stores/progress.js";
import { useAuth } from "../stores/auth.js";
import { lang, openChooser } from "../i18n/index.js";
import { sideUI } from "./sideUI.js";

const route = useRoute();
const progress = useProgress();
const auth = useAuth();

const r = computed(() => route.path.slice(1) || "home");
/* which top menu item the page belongs to */
const top = computed(() => {
  const x = r.value;
  return /^(lesson|checkpoint|project|course)-|^learn$/.test(x) ? "home" : x.startsWith("anim") ? "animations" : x.startsWith("snippet") ? "snippets" : x.startsWith("mindmap") ? "mindmap" : x;
});
const inRes = computed(() => ["animations", "snippets", "glossary", "errors"].includes(top.value) || r.value.startsWith("debug"));
const resCurrent = h => top.value === h || (h === "debug" && r.value.startsWith("debug"));

const NAV = [["home", "Courses"], ["mindmap", "Mind Map"], ["syllabus", "Syllabus"]];
const RES = [["animations", "Animations", "See how things work, step by step"], ["snippets", "Snippets", "Short videos with a voice"], ["glossary", "Glossary", "Every new word, explained"], ["errors", "Error help", "What error messages mean"], ["debug", "Debug Desk", "Ask and answer coding questions"]];

/* ---------- the Resources menu: opens on hover, click, tap or keyboard ---------- */
const wrap = ref(null), btn = ref(null), menu = ref(null);
const open = ref(false);
const pos = ref({ top: "0px", left: "0px" });
let t = null, byHover = false;
const hover = window.matchMedia ? matchMedia("(hover:hover)") : { matches: true };
function place() {
  if (!btn.value || !menu.value) return;
  const b = btn.value.getBoundingClientRect();
  pos.value = { top: (b.bottom + 6) + "px", left: Math.max(8, Math.min(b.left, innerWidth - menu.value.offsetWidth - 8)) + "px" };
}
function openMenu() { clearTimeout(t); if (open.value) return; open.value = true; nextTick(place); }
function closeMenu() { clearTimeout(t); open.value = false; }
function cancelClose() { clearTimeout(t); }
function later() { clearTimeout(t); t = setTimeout(closeMenu, 180); }
function onEnter() { if (hover.matches && !open.value) { openMenu(); byHover = true; } }
function onLeave() { if (hover.matches) later(); }
function onBtnClick() { if (!open.value) openMenu(); else if (byHover) byHover = false; else closeMenu(); }
function onBtnKey(e) { if (e.key === "ArrowDown") { e.preventDefault(); openMenu(); nextTick(() => menu.value.querySelector("a").focus()); } }
function onMenuKey(e) {
  const items = [...menu.value.querySelectorAll("a")], i = items.indexOf(document.activeElement);
  if (e.key === "ArrowDown") { e.preventDefault(); items[(i + 1) % items.length].focus(); }
  else if (e.key === "ArrowUp") { e.preventDefault(); items[(i - 1 + items.length) % items.length].focus(); }
  else if (e.key === "Escape") { closeMenu(); btn.value.focus(); }
}
function onMenuClick(e) { if (e.target.closest("a")) closeMenu(); }
function onFocusOut(e) { if (!wrap.value.contains(e.relatedTarget) && !(menu.value && menu.value.contains(e.relatedTarget))) later(); }
const onDocClick = e => { if (!e.target.closest("#navres") && !e.target.closest("#resmenu")) closeMenu(); };
const onMove = () => { if (open.value) place(); };
onMounted(() => { document.addEventListener("click", onDocClick); addEventListener("resize", onMove); addEventListener("scroll", onMove, true); });
onBeforeUnmount(() => { document.removeEventListener("click", onDocClick); removeEventListener("resize", onMove); removeEventListener("scroll", onMove, true); });
watch(() => route.fullPath, closeMenu);

function toggleSide() { sideUI.show = !sideUI.show; }
</script>

<template>
  <header class="top">
    <button class="iconbtn menu" id="menu" :aria-expanded="String(sideUI.show)" aria-controls="side" aria-label="Show the lesson list" @click="toggleSide"><svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg></button>
    <RouterLink class="brand" to="/home" aria-label="NoolStack, Education As A Service, beta, home"><img class="logo" src="logo.png" alt="" width="46" height="46"><span class="brandtext"><span class="beta">Beta</span><span>NoolStack</span></span></RouterLink>
    <nav class="nav" aria-label="Main">
      <RouterLink v-for="[h, label] in NAV" :key="h" :to="'/' + h" :aria-current="top === h ? 'page' : null" active-class="" exact-active-class="">{{ label }}</RouterLink>
      <div class="navdd" id="navres" ref="wrap" @mouseenter="onEnter" @mouseleave="onLeave" @focusout="onFocusOut">
        <button class="navddbtn" :class="{ on: inRes }" id="resbtn" ref="btn" aria-haspopup="true" :aria-expanded="String(open)" aria-controls="resmenu" @click="onBtnClick" @keydown="onBtnKey">Resources <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><path d="m6 9 6 6 6-6" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
        <div class="navmenu" id="resmenu" ref="menu" :hidden="!open" :style="pos" @mouseenter="cancelClose" @mouseleave="onLeave" @keydown="onMenuKey" @click="onMenuClick">
          <RouterLink v-for="[h, b, s] in RES" :key="h" :to="'/' + h" :aria-current="resCurrent(h) ? 'page' : null" active-class="" exact-active-class=""><b>{{ b }}</b><span>{{ s }}</span></RouterLink>
        </div>
      </div>
    </nav>
    <span class="chip" id="ptschip">{{ progress.points() }} points</span>
    <button class="iconbtn langbtn no-tr" id="lang" :aria-label="lang === 'ta' ? 'மொழி: தமிழ். மாற்ற அழுத்துங்கள்.' : 'Language: English. Press to change.'" @click="openChooser">{{ lang === "ta" ? "த" : "EN" }}</button>
    <ThemeToggle />
    <RouterLink class="btn small" id="acct" to="/account" active-class="" exact-active-class="">{{ auth.accountLabel }}</RouterLink>
  </header>
</template>
