<script setup>
/* Path explorer: the absolute path never changes; the relative path depends on where you are. */
import { ref, computed } from "vue";
const dirs = ["/Users", "/Users/ana", "/Users/ana/code", "/Users/ana/notes", "/Users/ana/Desktop"], files = ["/Users/ana/code/hello.py", "/Users/ana/code/game.py", "/Users/ana/notes/todo.txt", "/Users/ana/Desktop/photo.png"];
const here = ref(dirs[3]), to = ref(files[0]);
const rel = (a, b) => { const x = a.split("/").filter(Boolean), y = b.split("/").filter(Boolean); let c = 0; while (c < x.length && c < y.length - 1 && x[c] === y[c]) c++; return "../".repeat(x.length - c) + y.slice(c).join("/"); };
const relPath = computed(() => rel(here.value, to.value));
const tree = "/Users/\n    ana/\n        code/      hello.py   game.py\n        notes/     todo.txt\n        Desktop/   photo.png";
</script>

<template>
  <h3>Path explorer</h3><pre>{{ tree }}</pre>
  <div class="two"><div><label for="ph">You are in</label><br><select id="ph" v-model="here"><option v-for="d in dirs" :key="d">{{ d }}</option></select></div><div><label for="pt">You want</label><br><select id="pt" v-model="to"><option v-for="d in files" :key="d">{{ d }}</option></select></div></div>
  <p><b>Absolute path:</b> <code>{{ to }}</code></p><p><b>Relative path from here:</b> <code>{{ relPath }}</code></p>
  <p class="meta" style="margin:0">Change “You are in” and watch. The absolute path never changes. The relative path does.</p>
</template>
