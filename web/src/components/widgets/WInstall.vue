<script setup>
/* Install checklist, and a check of the version the terminal printed. */
import { ref, computed } from "vue";
const list = ["Python is installed", "A terminal shows me its version", "PyCharm is installed and opens", "I created a project and can see which Python it uses"];
const ver = ref("");
const fb = computed(() => {
  const v = ver.value, m = v.match(/Python\s+(\d+)\.(\d+)/i);
  if (!v.trim()) return "Checking each step is how you know an install worked.";
  if (m && +m[1] === 3 && +m[2] >= 15) return "That is Python 3." + m[2] + ". You are set.";
  if (m && +m[1] === 3 && +m[2] >= 10) return "That is Python 3." + m[2] + ". It works for everything in this course so far. You can add 3.15 later.";
  if (m) return "That is Python " + m[1] + "." + m[2] + ", which is too old for this course. Install 3.15.";
  return "I cannot see a version number there. What does the message say, word for word? If it says “not found”, try python3, or open a new terminal window.";
});
</script>

<template>
  <h3>Install checklist</h3>
  <div class="w-grid"><label v-for="x in list" :key="x" class="w-item" style="font-weight:400"><input type="checkbox"> <span>{{ x }}</span></label></div>
  <p style="margin-top:1rem"><label for="ver">Paste what your terminal printed for the version command</label></p>
  <input type="text" id="ver" placeholder="For example: Python 3.15.2" style="width:min(24rem,100%)" v-model="ver">
  <p class="fb" id="verfb" role="status">{{ fb }}</p>
</template>
