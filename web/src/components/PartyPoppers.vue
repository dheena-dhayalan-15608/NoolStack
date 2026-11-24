<script setup>
/* Party poppers: bursts of confetti from the bottom corners. Skipped when reduced motion is asked for. */
import { partyState } from "../services/feedback.js";
</script>

<template>
  <div v-for="b in partyState.bursts" :key="b.id" class="party" aria-hidden="true"><i v-for="(s, k) in b.bits" :key="k" :style="s"></i></div>
</template>
