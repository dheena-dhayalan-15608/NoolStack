<script setup>
/* One snippet in a video player: play and pause, 5-second back and forward, keys
   (Space or k, ← and →), captions on or off, and chapters. */
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { useRoute } from "vue-router";
import { SNIPPETS } from "../data/snippets.js";
import { fmtT } from "../components/fmtT.js";
import Snippets from "./Snippets.vue";

const route = useRoute();
const sn = SNIPPETS.find(x => x.id === route.params.id && x.ready) || null;
const vid = ref(null);
const paused = ref(true), ended = ref(false), cur = ref(0), dur = ref(0), err = ref(false), cc = ref(true);
const chapter = computed(() => { let k = 0; if (sn) sn.chapters.forEach((c, i) => { if (cur.value + .05 >= c) k = i; }); return k; });
const playLabel = computed(() => paused.value ? (ended.value ? "Play again" : "Play") : "Pause");
function sync() { const v = vid.value; if (!v) return; paused.value = v.paused; ended.value = v.ended; cur.value = v.currentTime; dur.value = v.duration; }
function seek(d) { const v = vid.value; if (!v) return; v.currentTime = Math.max(0, Math.min((v.duration || 1e9) - .1, v.currentTime + d)); }
function togglePlay() { const v = vid.value; if (!v) return; if (v.paused) { v.muted = false; const p = v.play(); if (p && p.catch) p.catch(() => { err.value = true; }); } else v.pause(); }
function goTo(t) { const v = vid.value; if (!v) return; v.currentTime = t; v.play().catch(() => {}); }
function toggleCC() { const v = vid.value; if (!v || !v.textTracks[0]) return; const t = v.textTracks[0], on = t.mode !== "showing"; t.mode = on ? "showing" : "hidden"; cc.value = on; }
function onKey(e) {
  if (e.target.closest("button") && e.key === " ") return;
  if (e.key === " " || e.key === "k") { e.preventDefault(); const v = vid.value; v.paused ? v.play() : v.pause(); }
  else if (e.key === "ArrowLeft") { e.preventDefault(); seek(-5); }
  else if (e.key === "ArrowRight") { e.preventDefault(); seek(5); }
}
const bad = new Set();
function srcErr(i, n) { bad.add(i); if (bad.size >= n) err.value = true; }
onMounted(() => { const v = vid.value; if (!v) return; v.muted = false; v.volume = 1; sync(); });
onBeforeUnmount(() => { try { if (vid.value) vid.value.pause(); } catch (e) { /* ignore */ } });
</script>

<template>
  <Snippets v-if="!sn" />
  <template v-else>
    <p class="crumbs"><RouterLink to="/snippets">Snippets</RouterLink></p><h1>{{ sn.t }}</h1>
    <p class="lede" style="margin-top:.6rem">{{ sn.d }}</p>
    <div class="panel snipplayer" id="snipplayer" :data-id="sn.id" @keydown="onKey">
      <div class="vwrap"><video id="snipvid" ref="vid" controls playsinline preload="metadata" :poster="sn.poster" @play="sync" @pause="sync" @ended="sync" @timeupdate="sync" @seeked="sync" @loadedmetadata="sync" @error.capture="err = true"><source :src="sn.video" type="video/mp4" @error="srcErr(0, sn.webm ? 2 : 1)"><source v-if="sn.webm" :src="sn.webm" type="video/webm" @error="srcErr(1, 2)"><track kind="captions" srclang="en" label="English" :src="sn.vtt" default></video></div>
      <p class="fb no" id="viderr" :hidden="!err">This video could not play here. It plays on the live site.</p>
      <div class="row snipctl">
        <button class="btn quiet small" data-a="vback" aria-label="Back 5 seconds" @click="seek(-5)">−5 s</button>
        <button class="btn small" data-a="vplay" id="vplay" @click="togglePlay">{{ playLabel }}</button>
        <button class="btn quiet small" data-a="vfwd" aria-label="Forward 5 seconds" @click="seek(5)">+5 s</button>
        <span class="meta vtime" id="vtime">{{ fmtT(cur) }} / {{ fmtT(dur || sn.dur) }}</span>
        <button class="btn quiet small" data-a="vcc" id="vcc" :aria-pressed="String(cc)" @click="toggleCC">{{ cc ? "Captions on" : "Captions off" }}</button>
      </div>
      <p class="meta" style="margin:.2rem 0 0">Keys: Space to play or pause, ← and → to move 5 seconds.</p>
    </div>
    <section><h2>Chapters</h2><ol class="vchap"><li v-for="(s, i) in sn.scenes" :key="i"><button :class="['vchapbtn', { now: i === chapter }]" data-a="vgo" :id="'vch' + i" @click="goTo(sn.chapters[i])"><span class="meta">{{ fmtT(sn.chapters[i]) }}</span> {{ s.t }}</button></li></ol></section>
  </template>
</template>
