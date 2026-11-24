<script setup>
/* "Done" line with an animated tick. fresh plays the tick animation. */
defineProps({ text: String, fresh: Boolean });
</script>

<template>
  <p class="done" :class="{ fresh }"><svg class="tick" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M7 12.5l3.2 3.2L17 9"/></svg><span>{{ text }}</span></p>
</template>
