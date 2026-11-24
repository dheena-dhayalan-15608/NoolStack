<script setup>
/* Pick one answer, or several when the task says multi. */
import { inject } from "vue";
import { useProgress } from "../../stores/progress.js";
const { t, e, entry, refresh } = inject("task");
const progress = useProgress();
const on = i => (e.value.pick || []).includes(i);
function cls(i) { let c = "opt tchoice" + (on(i) ? " on" : ""); if (e.value.done && t.value.ans.includes(i)) c += " right"; return c; }
function pick(i) {
  const x = entry();
  let p = x.pick || [];
  if (t.value.multi) p = p.includes(i) ? p.filter(v => v !== i) : p.concat(i); else p = [i];
  x.pick = p; x.msg = "";
  progress.save();
  refresh(`[data-a="tpick"][data-i="${i}"]`);
}
</script>

<template>
  <div class="opts" role="group" aria-label="Choices"><button v-for="(o, i) in t.opts" :key="i" :class="cls(i)" data-a="tpick" :data-i="i" :aria-pressed="String(on(i))" :disabled="!!e.done" @click="pick(i)">{{ t.multi ? (on(i) ? "☑ " : "☐ ") : "" }}{{ o }}</button></div>
  <p v-if="t.multi && !e.done" class="meta">Choose all that apply.</p>
</template>
