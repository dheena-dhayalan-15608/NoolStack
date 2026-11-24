<script setup>
/* The code box, the input() answers box and the output of a Python task. */
import PyNote from "./tasks/PyNote.vue";
const props = defineProps({ idBase: String, code: String, inp: String, needsInput: Boolean, readonly: Boolean, output: String });
const emit = defineEmits(["update:code", "update:inp"]);
function onKey(ev) {
  if (ev.key !== "Tab" || ev.shiftKey) return;
  ev.preventDefault();
  const x = ev.target, s = x.selectionStart;
  x.value = x.value.slice(0, s) + "    " + x.value.slice(x.selectionEnd);
  x.selectionStart = x.selectionEnd = s + 4;
  emit("update:code", x.value);
}
const rows = () => Math.max(6, props.code.split("\n").length + 2);
</script>

<template>
  <label class="sr-only" :for="'py-' + idBase">Your Python code</label><textarea class="tans code pycode" :id="'py-' + idBase" :data-k="idBase" :rows="rows()" spellcheck="false" placeholder="Write your Python here" :readonly="readonly" :value="code" @input="emit('update:code', $event.target.value)" @keydown="onKey"></textarea>
  <div v-if="needsInput" class="field"><label :for="'pyin-' + idBase">Answers to type when your program asks (one per line)</label><textarea class="tans code pyin" :id="'pyin-' + idBase" :data-k="idBase" rows="2" spellcheck="false" :value="inp" @input="emit('update:inp', $event.target.value)"></textarea></div>
  <div class="pyout"><span class="meta">Output</span><pre aria-live="polite"><template v-if="output">{{ output }}</template><span v-else class="dim">Press Run to see what your program prints.</span></pre></div>
  <PyNote />
</template>
