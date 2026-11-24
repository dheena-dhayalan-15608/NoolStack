<script setup>
/* Put each item in a group. */
import { inject } from "vue";
import { useProgress } from "../../stores/progress.js";
const { t, e, entry, refresh } = inject("task");
const progress = useProgress();
const on = (i, ci) => (e.value.sel || [])[i] === ci;
function pick(i, ci) {
  const x = entry();
  x.sel = x.sel || [];
  x.sel[i] = ci; x.msg = "";
  progress.save();
  refresh(`[data-a="tsort"][data-i="${i}"][data-c="${ci}"]`);
}
</script>

<template>
  <div class="w-grid"><div v-for="(it, i) in t.items" :key="i" class="w-item"><span>{{ it[0] }}</span><button v-for="(c, ci) in t.cats" :key="ci" :class="['pick', { on: on(i, ci), right: e.done && on(i, ci) }]" data-a="tsort" :data-i="i" :data-c="ci" :aria-pressed="String(on(i, ci))" :disabled="!!e.done" @click="pick(i, ci)">{{ c }}</button></div></div>
</template>
