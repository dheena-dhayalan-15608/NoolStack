<script setup>
/* Step through the history of computers. */
import { ref, computed } from "vue";
import { ERAS } from "../../data/content.js";
import { aBox } from "../../data/animations.js";
const k = ref(0);
const flow = computed(() => aBox(ERAS[k.value][1], ERAS[k.value][2], true));
</script>

<template>
  <h3>Step through the history</h3><p>Choose a moment to see what changed.</p>
  <div class="row" style="margin-top:0"><button v-for="(e, i) in ERAS" :key="i" :class="['pick', { right: i === k }]" :data-j="i" :aria-pressed="String(i === k)" @click="k = i">{{ e[0] }}</button></div>
  <div class="aflow prose" style="margin-top:.9rem" v-html="flow"></div>
</template>
