<script setup>
/* Short narrated videos, one to three minutes each. */
import { SNIPPETS } from "../data/snippets.js";
import { fmtT } from "../components/fmtT.js";
</script>

<template>
  <h1>Snippets</h1><p class="lede" style="margin-top:.8rem">Short animated videos, each one to three minutes long, with a voice that explains how everyday technology works.</p>
  <section><div class="courses"><article v-for="sn in SNIPPETS" :key="sn.id" :class="['panel', 'ccard', 'snipcard', { soon: !sn.ready }]"><RouterLink v-if="sn.ready" :to="'/snippet-' + sn.id" class="snipthumb"><img :src="sn.poster" alt="" loading="lazy"><span class="snipdur">{{ fmtT(sn.dur) }}</span><span class="snipplayico" aria-hidden="true">▶</span></RouterLink><h3>{{ sn.t }}</h3><p class="meta">{{ sn.d }}</p>
    <RouterLink v-if="sn.ready" class="btn small" :to="'/snippet-' + sn.id">Watch</RouterLink><span v-else class="soon-tag">Coming soon</span></article></div></section>
</template>
