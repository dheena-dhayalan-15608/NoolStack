<script setup>
/* A course roadmap. Tapping a topic opens a panel to read about it, open its lesson, or tick it as done. */
import { ref, computed, nextTick } from "vue";
import { useRoute } from "vue-router";
import { ROADMAPS } from "../data/roadmaps.js";
import { useProgress } from "../stores/progress.js";
import { party } from "../services/feedback.js";
import MindMap from "./MindMap.vue";
import RmStage from "../components/RmStage.vue";
import RoadmapDrawer from "../components/RoadmapDrawer.vue";

const route = useRoute();
const progress = useProgress();
const R = ROADMAPS[route.params.id] || null;
const all = R ? R.stages.flatMap(s => s.topics.map(t => Object.assign({ stage: s }, t))) : [];
const done = computed(() => { const m = progress.mapDone(); return all.filter(t => m[t.id]).length; });
const pc = computed(() => all.length ? Math.round(100 * done.value / all.length) : 0);
const rows = R ? R.stages.map(s => { const h = Math.ceil(s.topics.length / 2); return { s, left: s.topics.slice(0, h), right: s.topics.slice(h) }; }) : [];
const isDone = id => !!progress.mapDone()[id];
const open = ref(null);
const topic = computed(() => open.value ? all.find(t => t.id === open.value) : null);
function toggle(id) {
  const m = progress.mapDone();
  if (m[id]) delete m[id]; else { m[id] = 1; party(30); }
  progress.save();
  open.value = null;
  window.scrollTo(0, 0);
  nextTick(() => { const nb = document.querySelector(`[data-a="rmtopic"][data-id="${id}"]`); if (nb) nb.focus(); });
}
</script>

<template>
  <MindMap v-if="!R" />
  <template v-else>
    <p class="crumbs"><RouterLink to="/mindmap">Mind Map</RouterLink></p><h1>{{ R.t }} roadmap</h1><p class="lede" style="margin-top:.6rem">{{ R.intro }}</p>
    <div class="panel rmprog"><div class="row" style="justify-content:space-between;margin:0"><b>{{ done }} of {{ all.length }} topics done</b><span class="meta">{{ pc }}%</span></div><div class="bar"><i :style="{ width: pc + '%' }"></i></div>
      <p class="meta" style="margin:.5rem 0 0">Tap a topic to read what it is, open its lesson, or tick it as done.</p></div>
    <div class="rmkey meta"><span><i class="k live"></i> Lesson ready</span><span><i class="k soon"></i> Coming soon</span><span><i class="k done"></i> Done</span></div>
    <div class="rm">
      <RmStage cls="start">Start</RmStage>
      <RmStage v-for="r in rows" :key="r.s.t" :soon="!!r.s.soon">{{ r.s.t }}<template v-if="r.s.soon">{{ " " }}<span class="soon-tag">Coming soon</span></template>
        <template v-for="side in ['left', 'right']" :key="side" #[side]>
          <button v-for="t in r[side]" :key="t.id" :class="['rmnode', { done: isDone(t.id), soon: !!r.s.soon }]" data-a="rmtopic" :data-id="t.id" :aria-label="t.t + (isDone(t.id) ? ', done' : '') + (r.s.soon ? ', coming soon' : '')" @click="open = t.id"><span class="rmtick" aria-hidden="true">{{ isDone(t.id) ? "✓" : "" }}</span><span>{{ t.t }}</span></button>
        </template>
      </RmStage>
      <RmStage cls="start">Next: more topics are on the way</RmStage>
    </div>
    <RoadmapDrawer v-if="topic" @close="open = null">
      <p class="meta" style="margin:0 2.5rem .3rem 0">{{ R.t }} · {{ topic.stage.t }}</p><h2 id="rmdh" style="margin:0 2.5rem .6rem 0">{{ topic.t }}</h2><p>{{ topic.d }}</p>
      <p><template v-if="topic.stage.soon"><span class="soon-tag">Coming soon</span> The lesson for this topic is on the way.</template><span v-else class="rmstatus">Lesson ready</span></p>
      <div class="row"><RouterLink v-if="topic.go && !topic.stage.soon" class="btn small" :to="'/' + topic.go" data-rm="go">Open it</RouterLink><button :class="['btn', 'small', { quiet: topic.go && !topic.stage.soon }]" data-rm="toggle" :aria-pressed="String(isDone(topic.id))" @click="toggle(topic.id)">{{ isDone(topic.id) ? "✓ Done (tap to undo)" : "Mark as done" }}</button></div>
    </RoadmapDrawer>
  </template>
</template>
