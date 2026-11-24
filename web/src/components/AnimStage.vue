<script setup>
/* A step-by-step animation: the picture for each step, its caption, and play, back, next and restart.
   With auto, it plays by itself unless the learner has asked for reduced motion. */
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { ANIMS } from "../data/animations.js";

const props = defineProps({ id: { type: String, required: true }, auto: Boolean });
const a = ANIMS.find(x => x.id === props.id);
const i = ref(0), playing = ref(false);
const last = a ? a.cap.length - 1 : 0;
let timer = null;

const stage = computed(() => a ? a.draw(i.value) : "");
const playLabel = computed(() => playing.value ? "Pause" : (i.value >= last ? "Play again" : "Play"));
function stop() { playing.value = false; clearInterval(timer); }
function play() {
  if (i.value >= last) i.value = 0;
  playing.value = true;
  timer = setInterval(() => {
    if (i.value >= last) { stop(); return; }
    i.value++;
    if (i.value >= last) stop();
  }, 2600);
}
function onPlay() { if (playing.value) stop(); else play(); }
function go(p) {
  stop();
  if (p === "back") i.value = Math.max(0, i.value - 1);
  else if (p === "next") i.value = Math.min(last, i.value + 1);
  else i.value = 0;
}
onMounted(() => { if (props.auto && !(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches)) play(); });
onBeforeUnmount(stop);
</script>

<template>
  <template v-if="a">
    <div class="stage" v-html="stage"></div>
    <p class="cap" role="status">{{ a.cap[i] }}</p>
    <div class="ctl"><button class="btn small" data-p="play" @click="onPlay">{{ playLabel }}</button><button class="btn quiet small" data-p="back" @click="go('back')">Back</button><button class="btn quiet small" data-p="next" @click="go('next')">Next</button><button class="btn quiet small" data-p="restart" @click="go('restart')">Restart</button><span class="meta stepn">Step {{ i + 1 }} of {{ a.cap.length }}</span></div>
  </template>
</template>
