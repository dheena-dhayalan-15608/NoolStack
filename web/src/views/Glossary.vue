<script setup>
/* Every new word so far, with the lesson that introduces it. */
import { ref, computed } from "vue";
import { ALL } from "../stores/progress.js";
const all = [];
ALL().forEach(n => n.G.forEach(g => all.push([g[0], g[1], n.t])));
all.sort((a, b) => a[0].toLowerCase().localeCompare(b[0].toLowerCase()));
const q = ref("");
const shown = w => w[0].toLowerCase().includes(q.value.trim().toLowerCase());
const any = computed(() => all.some(shown));
</script>

<template>
  <h1>Glossary</h1><p class="lede" style="margin-top:.8rem">Every new word so far, with the lesson that introduces it.</p>
  <section><label for="gq">Find a word</label><br><input type="search" id="gq" placeholder="Type a word" autocomplete="off" style="margin-top:.4rem;width:min(22rem,100%)" v-model="q">
    <dl id="glist" style="margin-top:1rem"><div v-for="(g, k) in all" :key="k" :data-w="g[0].toLowerCase()" :hidden="!shown(g)"><dt>{{ g[0] }} <small class="meta">{{ g[2] }}</small></dt><dd>{{ g[1] }}</dd></div></dl>
    <p class="meta" id="gnone" :hidden="any">No word matches. Try a shorter search.</p></section>
</template>
