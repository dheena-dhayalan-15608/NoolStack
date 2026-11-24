<script setup>
/* A course project: the brief, questions to ask yourself, hints and a "done when" checklist. */
import { useRoute } from "vue-router";
import { PROJECTS } from "../data/content.js";
import { useProgress, course } from "../stores/progress.js";
import { party } from "../services/feedback.js";
import Home from "./Home.vue";
import Pager from "../components/Pager.vue";

const route = useRoute();
const progress = useProgress();
const id = /^[a-z]+$/.test(route.params.id) && PROJECTS[route.params.id] ? route.params.id : null;
const P = id ? PROJECTS[id].data : null, c = id ? PROJECTS[id].course : null;
const st = () => progress.pjState(id);
function hint() { const s = st(); s.hints = Math.min(3, (s.hints || 0) + 1); progress.save(); }
function tick(j, on) {
  const s = st();
  s.checks[j] = on ? 1 : 0;
  for (let k = 0; k < P.checks.length; k++) s.checks[k] = s.checks[k] ? 1 : 0;
  progress.save();
  if (progress.projDone(id)) party(90);
}
</script>

<template>
  <Home v-if="!id" />
  <template v-else>
    <p class="crumbs"><RouterLink :to="'/course-' + c">{{ course(c).name }}</RouterLink>, project</p><h1>{{ P.name }}</h1>
    <p class="lede" style="margin-top:.8rem">{{ P.lede }}</p>
    <section><h2>The brief</h2><ol class="walk"><li v-for="(x, k) in P.brief" :key="k">{{ x }}</li></ol></section>
    <section><h2>Ask yourself</h2><ul class="deep"><li v-for="(x, k) in P.ask" :key="k">{{ x }}</li></ul></section>
    <div id="projblock"><section><h2>Hints</h2><p>Try on your own first.</p><p v-for="(x, j) in P.hints.slice(0, st().hints || 0)" :key="j" class="hint"><b>Hint {{ j + 1 }}:</b> {{ x }}</p><button v-if="(st().hints || 0) < 3" class="btn quiet small" data-a="phint" @click="hint">Show hint {{ (st().hints || 0) + 1 }} of 3</button></section>
      <section><h2>Done when</h2><div class="w-grid"><label v-for="(x, j) in P.checks" :key="j" class="w-item" style="font-weight:400"><input type="checkbox" data-a="pcheck" :checked="!!st().checks[j]" @change="tick(j, $event.target.checked)"> <span>{{ x }}</span></label></div>
        <p v-if="progress.projDone(id)" class="done" style="margin-top:1rem">Project complete. Well done.</p></section></div>
    <section v-if="P.after"><h2>Going further</h2><p class="meta">Read this after you have finished the project.</p><ul class="deep"><li v-for="(x, k) in P.after" :key="k">{{ x }}</li></ul></section>
    <Pager :id="'pj:' + id" />
  </template>
</template>
