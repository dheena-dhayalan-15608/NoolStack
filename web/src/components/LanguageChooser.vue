<script setup>
/* The language chooser: shown on the first visit, and from the language button in the header. */
import { ref, watch, nextTick, onBeforeUnmount } from "vue";
import { langUI, lang, chooseLanguage } from "../i18n/index.js";

const box = ref(null);
let prev = null;
function close(l) {
  document.removeEventListener("keydown", onKey, true);
  chooseLanguage(l);
  if (l === lang && prev && prev.focus) prev.focus();
}
function onKey(e) {
  const bs = box.value ? [...box.value.querySelectorAll("[data-l]")] : [];
  if (e.key === "Escape") { e.preventDefault(); close(lang); }
  else if (e.key === "Tab") { e.preventDefault(); const i = bs.indexOf(document.activeElement); bs[(i + (e.shiftKey ? bs.length - 1 : 1)) % bs.length].focus(); }
}
watch(() => langUI.open, o => {
  if (!o) return;
  prev = document.activeElement;
  document.addEventListener("keydown", onKey, true);
  nextTick(() => { const bs = box.value.querySelectorAll("[data-l]"); bs[lang === "ta" ? 1 : 0].focus(); });
}, { immediate: true });
onBeforeUnmount(() => document.removeEventListener("keydown", onKey, true));
</script>

<template>
  <div v-if="langUI.open" id="langmodal" class="langmodal no-tr" ref="box">
    <div class="panel lmbox" role="dialog" aria-modal="true" aria-labelledby="lmh">
      <h2 id="lmh" lang="en">Choose your language</h2><p class="lmta" lang="ta">உங்கள் மொழியைத் தேர்ந்தெடுக்கவும்</p>
      <div class="lmopts"><button class="btn" :class="{ quiet: lang !== 'en' }" data-l="en" lang="en" @click="close('en')">English</button><button class="btn" :class="{ quiet: lang !== 'ta' }" data-l="ta" lang="ta" @click="close('ta')">தமிழ்</button></div>
      <p class="meta" lang="en">You can change this at any time with the language button at the top.</p>
      <p class="meta" lang="ta">மேலே உள்ள மொழிப் பொத்தானைக் கொண்டு எப்போது வேண்டுமானாலும் இதை மாற்றலாம்.</p>
    </div>
  </div>
</template>
