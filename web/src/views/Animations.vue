<script setup>
/* Every animation, grouped by category, with search, a category filter and saved bookmarks. */
import { computed } from "vue";
import { CATS, ANIMS } from "../data/animations.js";
import { useProgress, NODE } from "../stores/progress.js";
import { NODES, NODES1 } from "../data/content.js";
import { courseOf, course } from "../stores/progress.js";
import { animFilter as F } from "../components/animState.js";
import Ic from "../components/Ic.vue";

const progress = useProgress();
const animNode = x => x.nid ? NODE[x.nid] : (x.lv === 0 ? NODES : NODES1)[x.lesson - 1];
const animCourse = x => { const c = courseOf(animNode(x).id); return c === "cf" ? "Fundamentals" : course(c).name; };
const groups = computed(() => {
  const q = F.q.trim().toLowerCase(), out = [];
  for (const c of CATS) {
    const list = ANIMS.filter(a => a.cat === c && (F.cat === "all" || F.cat === c) && (!F.saved || progress.S.bm[a.id]) && (!q || (a.t + " " + a.d).toLowerCase().includes(q)));
    if (list.length) out.push({ c, list });
  }
  return out;
});
function bm(id) { if (progress.S.bm[id]) delete progress.S.bm[id]; else progress.S.bm[id] = 1; progress.save(); }
function toggleSaved() { F.saved = !F.saved; window.scrollTo(0, 0); }
</script>

<template>
  <h1>Animations</h1><p class="lede" style="margin-top:.8rem">Step-by-step pictures of what the computer is doing. Press play, or step through at your own pace.</p>
  <div class="filters"><label class="search"><Ic name="search" /><input type="search" id="aq" placeholder="Search animations" aria-label="Search animations" autocomplete="off" :value="F.q" @input="F.q = $event.target.value"></label>
    <select id="acat" aria-label="Category" v-model="F.cat"><option value="all">All categories</option><option v-for="c in CATS" :key="c" :value="c">{{ c }}</option></select>
    <button :class="['btn', 'quiet', { on: F.saved }]" data-a="asaved" :aria-pressed="String(F.saved)" @click="toggleSaved"><Ic name="mark" />Saved only</button></div>
  <div id="agrid">
    <template v-for="g in groups" :key="g.c"><h2 class="cat">{{ g.c }}</h2><div class="agrid">
      <article v-for="a in g.list" :key="a.id" class="acard"><RouterLink class="acover" :to="'/anim-' + a.id"><h3>{{ a.t }}</h3><p>{{ a.d }}</p></RouterLink><span class="tag">{{ animCourse(a) }}</span><button :class="['iconbtn', 'bm', { on: progress.S.bm[a.id] }]" data-a="bm" :aria-pressed="String(!!progress.S.bm[a.id])" :aria-label="'Save ' + a.t" @click="bm(a.id)"><Ic name="mark" /></button></article>
    </div></template>
    <p v-if="!groups.length" class="meta" style="margin-top:2rem">Nothing matches. Try a different search or category.</p>
  </div>
</template>
