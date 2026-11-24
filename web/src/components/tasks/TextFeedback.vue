<script setup>
/* The key-point checklist shown after a written answer is checked. */
import { computed } from "vue";
const props = defineProps({ fb: Object });
const done = computed(() => props.fb && props.fb.items ? props.fb.items.filter(x => x.ok).length : 0);
</script>

<template>
  <template v-if="fb">
    <p v-if="fb.note" class="fb no" role="status">{{ fb.note }}</p>
    <div v-else class="fb tfb" :class="fb.pass ? 'ok' : 'no'" role="status">
      <p><b>{{ fb.pass ? "Well done. Your answer covers the key points." : "Not there yet. Your answer covers " + done + " of " + fb.items.length + " points." }}</b></p>
      <ul class="tcheck"><li v-for="(x, j) in fb.items" :key="j" :class="x.ok ? 'ok' : 'miss'"><span aria-hidden="true">{{ x.ok ? "✓" : "○" }}</span> <span>{{ x.label }}{{ x.opt ? " (optional)" : "" }}</span><template v-if="x.info"><br><span class="meta">{{ x.info }}</span></template></li></ul>
    </div>
  </template>
</template>
