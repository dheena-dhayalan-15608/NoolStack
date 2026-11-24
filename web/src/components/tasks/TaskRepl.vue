<script setup>
/* A practice Python prompt (>>>) for the task. It is marked as soon as the goal is reached. */
import { computed, inject, watch } from "vue";
import { REPLS } from "../../services/tasks.js";
import { loadPython, runLine } from "../../services/python.js";
import PyNote from "./PyNote.vue";
const { key, e, refresh, auto } = inject("task");
watch(() => REPLS[key.value], v => { if (!v) REPLS[key.value] = []; }, { immediate: true, flush: "sync" });
const h = computed(() => REPLS[key.value] || []);
function onEnter(ev) {
  ev.preventDefault();
  const line = ev.target.value;
  if (!line.trim()) return;
  const list = h.value;
  ev.target.value = "";
  loadPython(ok => {
    if (!ok) list.push({ line, out: "The Python runner could not load here." });
    else { const r = runLine(line); list.push({ line, out: r.all }); }
    refresh(".rin");
    auto();
  });
}
</script>

<template>
  <div class="termbox">
    <div class="termlog" aria-live="polite">
      <template v-if="h.length"><template v-for="(x, j) in h" :key="j"><div class="dim">&gt;&gt;&gt; {{ x.line }}</div><div v-if="x.out">{{ x.out.replace(/\n$/, "") }}</div></template></template>
      <span v-else class="dim">Type Python after &gt;&gt;&gt; and press Enter.</span>
    </div>
    <div v-if="!e.done" class="termin"><span>&gt;&gt;&gt;</span><input type="text" class="rin" :data-k="key" aria-label="Type a line of Python" autocomplete="off" autocapitalize="off" spellcheck="false" @keydown.enter="onEnter"></div>
  </div>
  <PyNote />
</template>
