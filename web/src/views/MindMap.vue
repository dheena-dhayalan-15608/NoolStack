<script setup>
/* Every subject on NoolStack, laid out as a path from the top down. */
import { ref } from "vue";
import { PLANNED } from "../data/content.js";
import { useProgress } from "../stores/progress.js";
import { ROADMAPS } from "../data/roadmaps.js";
import RmStage from "../components/RmStage.vue";
import RoadmapDrawer from "../components/RoadmapDrawer.vue";

const progress = useProgress();
const live = { "Foundations": [["cf", "Computer fundamentals"]], "Languages": [["py", "Python"]] };
const pct = id => { const all = ROADMAPS[id].stages.flatMap(s => s.topics); const m = progress.mapDone(); return Math.round(100 * all.filter(t => m[t.id]).length / all.length); };
const rows = PLANNED.map(([g, list]) => { const items = (live[g] || []).map(([id, n]) => ({ id, n })).concat(list.map(n => ({ n }))); const h = Math.ceil(items.length / 2); return { g, left: items.slice(0, h), right: items.slice(h) }; });
const soon = ref("");
</script>

<template>
  <h1>Mind Map</h1><p class="lede" style="margin-top:.8rem">Every subject on NoolStack, laid out as a path. Read it from the top down. Open a bright subject to see its full roadmap and tick off topics as you learn them.</p>
  <div class="rmkey meta"><span><i class="k live"></i> Roadmap ready</span><span><i class="k soon"></i> Coming soon</span><span><i class="k done"></i> Done</span></div>
  <div class="rm">
    <RmStage cls="start">Start here</RmStage>
    <RmStage v-for="r in rows" :key="r.g">{{ r.g }}
      <template v-for="side in ['left', 'right']" :key="side" #[side]>
        <template v-for="it in r[side]" :key="it.n">
          <RouterLink v-if="it.id" class="rmnode live" :to="'/mindmap-' + it.id"><span class="rmtick" aria-hidden="true">{{ pct(it.id) === 100 ? "✓" : "" }}</span><span>{{ it.n }}</span><span class="rmpct">{{ pct(it.id) }}%</span></RouterLink>
          <button v-else class="rmnode soon" data-a="rmsoon" @click="soon = it.n"><span>{{ it.n }}</span></button>
        </template>
      </template>
    </RmStage>
    <RmStage cls="start">Keep going</RmStage>
  </div>
  <RoadmapDrawer v-if="soon" @close="soon = ''">
    <h2 id="rmdh" style="margin:0 2.5rem .6rem 0">{{ soon }}</h2><p><span class="soon-tag">Coming soon</span> This roadmap is being written. The live roadmaps today are Computer fundamentals and Python.</p>
    <div class="row"><RouterLink class="btn small" to="/mindmap-cf" data-rm="go">Computer fundamentals</RouterLink><RouterLink class="btn quiet small" to="/mindmap-py" data-rm="go">Python</RouterLink></div>
  </RoadmapDrawer>
</template>
