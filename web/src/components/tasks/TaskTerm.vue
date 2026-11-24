<script setup>
/* A practice terminal for the task. It is marked as soon as the goal is reached. */
import { computed, inject, watch } from "vue";
import { TERMS, termNew, termRun, termPrompt } from "../../services/tasks.js";
const { key, t, e, refresh, auto } = inject("task");
watch(() => TERMS[key.value], v => { if (!v) TERMS[key.value] = termNew(t.value); }, { immediate: true, flush: "sync" });
const s = computed(() => TERMS[key.value]);
function onEnter(ev) {
  ev.preventDefault();
  termRun(s.value, ev.target.value);
  ev.target.value = "";
  refresh(".ttin");
  auto();
}
</script>

<template>
  <div v-if="s" class="termbox">
    <div class="termlog" aria-live="polite">
      <template v-if="s.log.length"><template v-for="(x, j) in s.log" :key="j"><div v-if="x.o !== undefined">{{ x.o }}</div><div v-else class="dim">{{ x.p }} {{ x.c }}</div></template></template>
      <span v-else class="dim">Type a command and press Enter.</span>
    </div>
    <div v-if="!e.done" class="termin"><span>{{ termPrompt(s) }}</span><input type="text" class="ttin" :data-k="key" aria-label="Type a command" autocomplete="off" autocapitalize="off" spellcheck="false" @keydown.enter="onEnter"></div>
  </div>
</template>
