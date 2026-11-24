<script setup>
/* Text to numbers: each character's number, and the byte that stores it. */
import { ref, computed } from "vue";
const text = ref("Hi 5");
const chars = computed(() => [...text.value].map(ch => { const n = ch.codePointAt(0); return { ch: ch === " " ? "space" : ch, n, b: n < 256 ? n.toString(2).padStart(8, "0") : "needs more than one byte" }; }));
const note = computed(() => { const s = chars.value; return s.length ? s.length + (s.length === 1 ? " character." : " characters.") + " A capital letter, a small letter, a space and a digit all get different numbers." : "Type something to see its numbers."; });
</script>

<template>
  <h3>Text to numbers</h3><p><label for="asc">Type a short word</label></p>
  <input type="text" id="asc" v-model="text" maxlength="12" autocomplete="off" autocapitalize="off" spellcheck="false" style="width:min(16rem,100%)">
  <div class="scroll" style="margin-top:.8rem"><table style="min-width:16rem"><thead><tr><th>Character</th><th>Number</th><th>As one byte</th></tr></thead><tbody id="ascb"><tr v-for="(c, k) in chars" :key="k"><td><code>{{ c.ch }}</code></td><td>{{ c.n }}</td><td><code>{{ c.b }}</code></td></tr></tbody></table></div>
  <p class="meta" id="ascn" style="margin:.7rem 0 0">{{ note }}</p>
</template>
