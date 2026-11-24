<script setup>
/* One quiz question. 10 points at the first try, 7 after a hint, 4 at the second try.
   store is "quiz" for lessons, or "cp" / "cp1" for checkpoint questions. */
import { ref, computed, nextTick } from "vue";
import { useProgress } from "../stores/progress.js";

const props = defineProps({ store: String, k: String, q: Object, label: String });
const emit = defineEmits(["answered"]);
const progress = useProgress();
const panel = ref(null);
const e = computed(() => progress.S[props.store][props.k] || { tries: 0, hint: 0, wrong: [] });
const entry = () => progress.S[props.store][props.k] || (progress.S[props.store][props.k] = { tries: 0, hint: 0, wrong: [] });
const refocus = () => nextTick(() => { if (panel.value) panel.value.focus({ preventScroll: true }); });

function cls(i) {
  const x = e.value;
  let c = "opt";
  if (x.done && i === props.q.c) c += " right"; else if (x.wrong.includes(i)) c += " wrong";
  return c;
}
function answer(i) {
  const x = entry();
  x.tries++;
  if (i === props.q.c) { x.done = 1; x.ok = 1; x.pts = x.tries === 1 ? (x.hint ? 7 : 10) : 4; }
  else { x.wrong.push(i); x.hint = 1; if (x.tries >= 2) { x.done = 1; x.ok = 0; x.pts = 0; } }
  progress.save();
  refocus();
  emit("answered", x);
}
function hint() { entry().hint = 1; progress.save(); refocus(); }
</script>

<template>
  <div class="panel" :id="'b-' + k" tabindex="-1" ref="panel">
    <span v-if="e.done" class="pts">{{ e.pts }} of 10 points</span>
    <h3>{{ label }}</h3><p>{{ q.q }}</p>
    <div class="opts"><button v-for="(o, i) in q.o" :key="i" :class="cls(i)" data-a="ans" :disabled="!!e.done || e.wrong.includes(i)" @click="answer(i)">{{ o }}</button></div>
    <p v-if="e.hint" class="hint"><b>Hint:</b> {{ q.h }}</p>
    <div v-else-if="!e.done" class="row"><button class="btn quiet small" data-a="hint" @click="hint">Show a hint</button></div>
    <p v-if="e.done" class="fb" :class="e.ok ? 'ok' : 'no'"><b>{{ e.ok ? (e.tries === 1 ? "Correct." : "Correct on the second try.") : "The answer is highlighted." }}</b> {{ q.e }}</p>
    <p v-else-if="e.wrong.length" class="fb no">Not that one. Read the hint, then try once more.</p>
  </div>
</template>
