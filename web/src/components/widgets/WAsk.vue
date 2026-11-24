<script setup>
/* What does input give back? Always a str, whatever the user types. */
import { ref, computed } from "vue";
const v = ref("25");
const rows = computed(() => { const s = v.value, r = "'" + s + "'"; return [["answer", r], ["type(answer)", "<class 'str'>"], ["len(answer)", [...s].length + (s === "" ? ", an empty string" : "")], ["answer + 1", 'TypeError: can only concatenate str (not "int") to str'], ["answer * 2", "'" + s + s + "'"]]; });
</script>

<template>
  <h3>What does input give back?</h3><p>Pretend the program has just run <code>answer = input("How many? ")</code>. Type an answer as the user would.</p>
  <input type="text" id="aski" v-model="v" maxlength="20" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="The user’s answer" style="width:min(16rem,100%)">
  <div class="scroll" style="margin-top:.8rem"><table style="min-width:16rem"><thead><tr><th>In the program</th><th>Result</th></tr></thead><tbody id="askt"><tr v-for="x in rows" :key="x[0]"><td><code>{{ x[0] }}</code></td><td><code>{{ String(x[1]) }}</code></td></tr></tbody></table></div>
</template>
