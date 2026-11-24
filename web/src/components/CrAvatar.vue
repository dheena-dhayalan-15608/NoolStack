<script setup>
import { crHue, crInitial } from "../services/debugdesk.js";
defineProps({ name: String, uid: String, sz: String });
</script>

<template>
  <span :class="['crav', sz]" :style="{ '--h': crHue(name, uid) }" aria-hidden="true">{{ crInitial(name) }}</span>
</template>
