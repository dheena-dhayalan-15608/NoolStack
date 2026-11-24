<script setup>
/* A badge picture: a rosette with ribbons and one icon per badge (artwork in data/badges.js). */
import { computed } from "vue";
import { badgeParts } from "../data/badges.js";
const props = defineProps({ id: String, label: { type: String, default: "" } });
const b = computed(() => badgeParts(props.id));
</script>

<template>
  <svg v-if="b" class="bart" viewBox="0 0 120 142" role="img" :aria-label="label"><path d="M42 88l17 8-8 44-8-8-10 6z" :fill="b.dk"/><path d="M78 88l-17 8 8 44 8-8 10 6z" :fill="b.dk"/><path d="M47 92l12 5-7 34-6-6z" :fill="b.c" opacity=".55"/><path d="M73 92l-12 5 7 34 6-6z" :fill="b.c" opacity=".55"/><path :d="b.rosette" :fill="b.c"/><circle cx="60" cy="58" r="37" :fill="b.dk" opacity=".35"/><circle cx="60" cy="58" r="35" fill="#FBFAF6"/><g fill="none" :stroke="b.K" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round" v-html="b.icon"></g></svg>
</template>
