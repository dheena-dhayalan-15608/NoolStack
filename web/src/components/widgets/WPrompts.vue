<script setup>
/* Where am I? Tell a Python prompt from a shell prompt. */
import { ref } from "vue";
const ps = [[">>>", "py"], ["PS C:\\Users\\ana>", "sh"], ["...", "py"], ["ana@mac ~ %", "sh"], ["$", "sh"], ["C:\\Users\\ana>", "sh"]];
const cur = ref(0), run = ref(0), best = ref(0), msg = ref("Which world is this prompt from?");
function answer(x) {
  const p = ps[cur.value];
  if (x === p[1]) { run.value++; best.value = Math.max(best.value, run.value); msg.value = "Yes. “" + p[0] + "” is " + (p[1] === "py" ? "Python" : "the shell") + ". Next one."; }
  else { run.value = 0; msg.value = "Not quite. “" + p[0] + "” is " + (p[1] === "py" ? "Python: three arrows or three dots mean Python is listening." : "the shell: it shows a folder or a symbol such as $, % or >, never three arrows."); }
  let nx;
  do { nx = Math.floor(Math.random() * ps.length); } while (nx === cur.value);
  cur.value = nx;
}
</script>

<template>
  <h3>Where am I?</h3><p>Read the prompt, then say whether you would type Python or a shell command.</p>
  <div class="bigprompt">{{ ps[cur][0] }} <span style="opacity:.6">▌</span></div>
  <div class="row"><button class="btn small" @click="answer('py')">Python</button><button class="btn small" @click="answer('sh')">The shell</button></div>
  <p class="fb" role="status">{{ msg }}</p><p class="meta" style="margin:0">In a row: {{ run }}. Best: {{ best }}.</p>
</template>
