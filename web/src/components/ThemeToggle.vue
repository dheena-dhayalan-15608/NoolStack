<script setup>
/* Theme button: follows the browser until the learner picks a theme. */
import { useSettings } from "../stores/settings.js";
const settings = useSettings();
</script>

<template>
  <button class="iconbtn" id="theme" :aria-label="settings.shownTheme === 'dark' ? 'Switch to the light theme' : 'Switch to the dark theme'" @click="settings.toggle()"><svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8"/><path d="M12 4v16a8 8 0 000-16z" fill="currentColor"/></svg></button>
</template>
