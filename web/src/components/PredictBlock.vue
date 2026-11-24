<script setup>
/* One prediction: one go only. Right earns 10 points; wrong still shows what happens. */
import { ref, computed, nextTick } from "vue";
import { useProgress } from "../stores/progress.js";

const props = defineProps({ n: Object, i: Number });
const progress = useProgress();
const panel = ref(null);
const p = computed(() => props.n.P[props.i]);
const key = computed(() => props.n.id + "p" + props.i);
const e = computed(() => progress.S.pred[key.value]);
function cls(j) {
  let c = "opt";
  if (e.value) { if (j === p.value.c) c += " right"; else if (j === e.value.pick) c += " wrong"; }
  return c;
}
function pick(j) {
  const ok = j === p.value.c;
  progress.S.pred[key.value] = { pick: j, ok: ok ? 1 : 0, pts: ok ? 10 : 0, done: 1 };
  progress.save();
  nextTick(() => { if (panel.value) panel.value.focus({ preventScroll: true }); });
}
</script>

<template>
  <div class="panel" :id="'b-' + key" tabindex="-1" ref="panel">
    <span v-if="e" class="pts">{{ e.pts }} of 10 points</span>
    <h3>Prediction {{ i + 1 }}</h3><p>{{ p.q }}</p>
    <pre v-if="p.code">{{ p.code }}</pre>
    <div class="opts"><button v-for="(o, j) in p.o" :key="j" :class="cls(j)" data-a="pred" :disabled="!!e" @click="pick(j)">{{ o }}</button></div>
    <p v-if="e" class="fb" :class="e.ok ? 'ok' : 'no'"><b>{{ e.ok ? "You predicted it." : "Good try. Now you know something new." }}</b> {{ p.y }}<template v-if="p.x">{{ " " }}<br><b>A common wrong prediction:</b> {{ p.x }}</template></p>
  </div>
</template>
