<script setup>
/* Line-by-line runner: predict, then run one line at a time. The lines can be edited. */
import { ref } from "vue";
const lines = ref(['print("Hello, world!")', 'print("I study on")', 'print(5 + 2)']);
const pos = ref(0), outp = ref([]), msg = ref("Predict what will appear, then run one line at a time. You can edit the lines.");
const calc = s => { s = s.replace(/\s+/g, ""); if (!/^\d+([+\-*]\d+)*$/.test(s)) return null; return s.match(/[+-]?[^+-]+/g).reduce((t, x) => t + (x[0] === "-" ? -1 : 1) * x.replace(/^[+-]/, "").split("*").reduce((a, b) => a * b, 1), 0); };
const parse = (l, n) => {
  l = l.trim(); let m;
  if (!l) return { skip: 1 };
  if ((m = l.match(/^print\("([^"]*)"\)$/))) return { out: m[1] };
  if ((m = l.match(/^print\((.+)\)$/)) && calc(m[1]) !== null) return { out: String(calc(m[1])) };
  if (/[“”]/.test(l)) return { err: "SyntaxError: invalid character '“' (U+201C)" };
  if (/^print\("[^"]*\)?$/.test(l)) return { err: "SyntaxError: unterminated string literal (detected at line " + n + ")" };
  if (/^print\(/.test(l) && !/\)$/.test(l)) return { err: "SyntaxError: '(' was never closed" };
  return { note: "Line " + n + ": this practice runner only understands print with text in plain quotes, or whole numbers with + - and *." };
};
function edit(j, v) { lines.value[j] = v; pos.value = 0; outp.value = []; }
function reset() { pos.value = 0; outp.value = []; msg.value = "Ready. What do you expect the first line to show?"; }
function step() {
  if (pos.value === 0) {
    const bad = lines.value.map((l, j) => parse(l, j + 1)).find(r => r.err || r.note);
    if (bad) { outp.value = [bad.err || ""]; msg.value = bad.err ? "Python checks the whole file before it runs any line, so nothing ran. What does the error message say?" : bad.note; pos.value = 0; return; }
  }
  const r = parse(lines.value[pos.value], pos.value + 1);
  if (!r.skip) outp.value.push(r.out);
  pos.value++;
  msg.value = pos.value >= lines.value.length ? "Finished. The results appeared in the same order as the lines. Swap two lines by editing them and predict again." : "Line " + pos.value + " ran. What will line " + (pos.value + 1) + " show?";
}
</script>

<template>
  <h3>Line-by-line runner</h3>
  <div class="lines"><div v-for="(l, j) in lines" :key="j" :class="['line', { now: j === pos - 1 }]"><input type="text" :data-j="j" :value="l" :aria-label="'Line ' + (j + 1)" spellcheck="false" autocapitalize="off" autocomplete="off" @input="edit(j, $event.target.value)"></div></div>
  <div class="row"><button class="btn small" :disabled="pos >= lines.length" @click="step">Run the next line</button><button class="btn quiet small" @click="reset">Start again</button></div>
  <p class="meta" style="margin:.9rem 0 .3rem">What appears</p><pre style="min-height:4.5rem">{{ outp.join("\n") }}</pre>
  <p class="fb" role="status">{{ msg }}</p>
</template>
