<script setup>
/* How many bytes? Each character's Unicode number and its size in UTF-8. */
import { ref, computed } from "vue";
const text = ref("Aé😀");
const chars = computed(() => [...text.value].map(ch => { const cp = ch.codePointAt(0); return { ch: ch === " " ? "space" : ch, cp, n: cp < 128 ? 1 : cp < 2048 ? 2 : cp < 65536 ? 3 : 4 }; }));
const note = computed(() => { const s = chars.value, tot = s.reduce((a, c) => a + c.n, 0); return s.length ? s.length + (s.length === 1 ? " character, " : " characters, ") + tot + (tot === 1 ? " byte" : " bytes") + " in total." : "Type something to count its bytes."; });
</script>

<template>
  <h3>How many bytes?</h3><p><label for="u8">Type or paste any text</label></p>
  <input type="text" id="u8" v-model="text" maxlength="16" autocomplete="off" autocapitalize="off" spellcheck="false" style="width:min(16rem,100%)">
  <div class="scroll" style="margin-top:.8rem"><table style="min-width:16rem"><thead><tr><th>Character</th><th>Unicode number</th><th>Bytes in UTF-8</th></tr></thead><tbody id="u8b"><tr v-for="(c, k) in chars" :key="k"><td>{{ c.ch }}</td><td>{{ c.cp }}</td><td>{{ c.n }}</td></tr></tbody></table></div>
  <p class="meta" id="u8n" style="margin:.7rem 0 0">{{ note }}</p>
</template>
