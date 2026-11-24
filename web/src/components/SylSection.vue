<script setup>
/* One block on the syllabus page: a title, a Ready or Coming soon chip, and a numbered list. */
defineProps({ title: String, chip: String, ok: Boolean });
</script>

<template>
  <article class="panel syl"><header><h3>{{ title }}</h3><span :class="['chip', { ok }]">{{ chip }}</span></header><ol class="sylist"><slot /></ol></article>
</template>
