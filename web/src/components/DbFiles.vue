<script setup>
/* A question's attachments: screenshots as pictures (click for full size), text files as code. */
import { ref, onMounted } from "vue";
import { crFileUrl, crSize } from "../services/debugdesk.js";

const props = defineProps({ qid: String, files: Array });
const texts = ref({}), big = ref(null);
const images = props.files.filter(f => f.type.startsWith("image/")), others = props.files.filter(f => !f.type.startsWith("image/"));
onMounted(() => {
  others.forEach(async f => {
    try { const r = await fetch(crFileUrl(props.qid, f), { credentials: "same-origin" }); texts.value[f.i] = r.ok ? await r.text() : null; }
    catch (e) { texts.value[f.i] = null; }
  });
});
async function copy(t) { try { await navigator.clipboard.writeText(t); } catch (e) { /* not allowed */ } }
</script>

<template>
  <div class="dbatt">
    <div v-if="images.length" class="dbshots">
      <button v-for="f in images" :key="f.i" type="button" class="dbshot" data-a="dbshot" :aria-label="'Open ' + f.name" @click="big = f"><img :src="crFileUrl(qid, f)" :alt="f.name" loading="lazy"></button>
    </div>
    <figure v-for="f in others" :key="f.i" class="dbtxtfile">
      <figcaption><span class="dbfileicon" aria-hidden="true">TXT</span><b>{{ f.name }}</b><span class="meta">{{ crSize(f.size) }}</span><button v-if="texts[f.i]" type="button" class="linkbtn small" data-a="dbcopy" @click="copy(texts[f.i])">Copy</button></figcaption>
      <pre v-if="texts[f.i]" class="dbcode"><code>{{ texts[f.i] }}</code></pre>
      <p v-else-if="texts[f.i] === null" class="meta">This file could not be loaded.</p>
      <p v-else class="meta">Loading…</p>
    </figure>
    <div v-if="big" class="dblight" role="dialog" aria-modal="true" :aria-label="big.name" @click.self="big = null" @keydown.esc="big = null">
      <img :src="crFileUrl(qid, big)" :alt="big.name">
      <button type="button" class="btn quiet small" data-a="dbshotclose" autofocus @click="big = null">Close</button>
    </div>
  </div>
</template>
