<script setup>
/* Every click has a typed twin: each button shows the command that does the same job. */
import { ref } from "vue";
const acts = [["Make a new folder", "mkdir New_folder", ""], ["Look inside this folder", "ls", "New_folder    photos"], ["Open the photos folder", "cd photos", ""], ["Go back up one level", "cd ..", ""], ["Ask where you are", "pwd", "/Users/ana"]];
const log = ref([]);
function run(a) { log.value.push(a); if (log.value.length > 7) log.value.shift(); }
</script>

<template>
  <h3>Every click has a typed twin</h3><p>Press a button on the left. The command that does the same job appears on the right.</p>
  <div class="two"><div class="w-grid"><button v-for="(a, j) in acts" :key="j" class="opt" :data-j="j" @click="run(a)">{{ a[0] }}</button></div>
    <div class="termbox"><div class="termlog"><template v-if="log.length"><template v-for="(a, k) in log" :key="k"><template v-if="k">{{ "\n" }}</template><span class="dim">ana ~ %</span> {{ a[1] }}<template v-if="a[2]">{{ "\n" + a[2] }}</template></template></template><span v-else class="dim">The terminal is waiting.</span></div></div></div>
</template>
