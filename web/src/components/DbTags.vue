<script setup>
defineProps({ tags: Array });
</script>

<template>
  <span class="dbtags"><RouterLink v-for="x in tags || []" :key="x" class="dbtag" :to="'/debug-tag-' + x">{{ x }}</RouterLink></span>
</template>
