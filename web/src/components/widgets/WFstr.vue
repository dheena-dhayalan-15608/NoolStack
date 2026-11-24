<script setup>
/* Fill in the blanks: an f-string with the names sweets and name, with the f switched on or off. */
import { ref, computed } from "vue";
const vars = { sweets: 17, name: "Ana" };
const text = ref("{name} has {sweets} sweets"), f = ref(true);
const line = computed(() => "print(" + (f.value ? "f" : "") + '"' + text.value + '")');
const out = computed(() => {
  const t = text.value;
  if (!f.value) return t;
  let bad = null;
  let o = t.replace(/\{([^{}]*)\}/g, (m, k) => { k = k.trim(); if (Object.prototype.hasOwnProperty.call(vars, k)) return vars[k]; if (bad === null) bad = k; return m; });
  if (bad !== null) o = /^[A-Za-z_][A-Za-z0-9_]*$/.test(bad) ? "NameError: name '" + bad + "' is not defined" : "This practice box only understands the names sweets and name inside the brackets.";
  return o;
});
</script>

<template>
  <h3>Fill in the blanks</h3><p>Two variables exist: <code>sweets = 17</code> and <code>name = "Ana"</code>. Edit the text, and switch the f on and off.</p>
  <input type="text" id="fst" v-model="text" maxlength="60" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="The text inside the quotes" style="width:100%;font-family:var(--mono)">
  <div class="row"><button class="btn quiet small" id="fsf" :aria-pressed="String(f)" @click="f = !f">{{ f ? "The f is on" : "The f is off" }}</button></div>
  <p class="meta" style="margin:.9rem 0 .3rem">The line</p><pre id="fsl">{{ line }}</pre><p class="meta" style="margin:0 0 .3rem">What it prints</p><pre id="fso">{{ out }}</pre>
</template>
