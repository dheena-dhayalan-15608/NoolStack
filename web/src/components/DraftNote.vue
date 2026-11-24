<script setup>
import { draft } from "./LegalBits.js";
</script>

<template>
  <div v-if="draft" class="note warn" style="margin-top:1rem"><b>Draft.</b> The owner’s name still needs to be filled in, and this page should be reviewed before launch.</div>
</template>
