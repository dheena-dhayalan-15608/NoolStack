<script setup>
/* A small line icon from ICONS (data/badges.js). */
import { ICONS } from "../data/badges.js";
defineProps({ name: { type: String, required: true } });
</script>

<template>
  <svg class="ic" viewBox="0 0 24 24" aria-hidden="true" v-html="ICONS[name]"></svg>
</template>
