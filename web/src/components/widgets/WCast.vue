<script setup>
/* Will it convert? What int, float and str make of some text. */
import { ref, computed } from "vue";
const v = ref("3.5");
const rows = computed(() => {
  const s = v.value, t = s.trim(), q = "'" + s + "'";
  let i, f;
  if (/^[+-]?[0-9]+$/.test(t)) i = BigInt(t).toString(); else i = "ValueError: invalid literal for int() with base 10: " + q;
  if (/^[+-]?([0-9]+[.]?[0-9]*|[.][0-9]+)$/.test(t)) { const n = Number(t); f = Number.isInteger(n) && Math.abs(n) < 1e16 ? n + ".0" : String(n); } else f = "ValueError: could not convert string to float: " + q;
  return [['int("' + s + '")', i], ['float("' + s + '")', f], ['str("' + s + '")', q]];
});
</script>

<template>
  <h3>Will it convert?</h3><p>Type some text and see what each conversion makes of it.</p>
  <input type="text" id="casti" v-model="v" maxlength="20" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="Text to convert" style="width:min(16rem,100%)">
  <div class="scroll" style="margin-top:.8rem"><table style="min-width:16rem"><thead><tr><th>You write</th><th>Python gives</th></tr></thead><tbody id="castt"><tr v-for="(x, k) in rows" :key="k"><td><code>{{ x[0] }}</code></td><td><code>{{ x[1] }}</code></td></tr></tbody></table></div>
</template>
