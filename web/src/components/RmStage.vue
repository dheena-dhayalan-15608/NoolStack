<script setup>
/* One step on a roadmap: a stage in the middle, with topics branching off on both sides. */
defineProps({ soon: Boolean, cls: String });
</script>

<template>
  <div :class="['rmrow', { soon }]"><div class="rmside l"><slot name="left" /></div><div :class="['rmstage', cls]"><slot /></div><div class="rmside r"><slot name="right" /></div></div>
</template>
