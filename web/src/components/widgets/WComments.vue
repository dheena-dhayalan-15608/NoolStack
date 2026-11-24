<script setup>
/* Switch lines off by commenting them out, and see what the script prints. */
import { ref, computed } from "vue";
const lines = ['print("Start")', 'print("Middle")', 'print("End")'];
const off = ref([false, false, false]);
const printed = computed(() => lines.filter((l, j) => !off.value[j]).map(l => l.slice(7, -2)).join("\n"));
</script>

<template>
  <h3>Switch lines off</h3><p>Comment out any line and watch what the script prints.</p>
  <div class="w-grid"><div v-for="(l, j) in lines" :key="j" class="w-item"><span><code>{{ off[j] ? "# " : "" }}{{ l }}</code></span><button class="pick" :data-j="j" :aria-pressed="String(off[j])" @click="off[j] = !off[j]">{{ off[j] ? "Switch on" : "Comment out" }}</button></div></div>
  <p class="meta" style="margin:.9rem 0 .3rem">What it prints</p><pre style="min-height:4.5rem">{{ printed }}</pre>
</template>
