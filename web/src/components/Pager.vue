<script setup>
/* Back and Next links at the end of a lesson, checkpoint or project. */
import { courseIds, courseOf, itemHref, itemTitle } from "../stores/progress.js";
const props = defineProps({ id: String });
const seq = courseIds(courseOf(props.id)), k = seq.indexOf(props.id);
const b = k > 0 ? seq[k - 1] : null, n = k < seq.length - 1 ? seq[k + 1] : null;
</script>

<template>
  <div class="pager"><RouterLink v-if="b" class="btn quiet" :to="'/' + itemHref(b)">Back: {{ itemTitle(b) }}</RouterLink><span v-else></span><RouterLink v-if="n" class="btn" :to="'/' + itemHref(n)">Next: {{ itemTitle(n) }}</RouterLink><RouterLink v-else class="btn" to="/home">All courses</RouterLink></div>
</template>
