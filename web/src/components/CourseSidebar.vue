<script setup>
/* The course sidebar, shown beside lessons, checkpoints and projects. */
import { computed } from "vue";
import { useRoute } from "vue-router";
import Ic from "./Ic.vue";
import { useProgress, course, courseIds, courseSize, itemHref, itemTitle, itemIcon } from "../stores/progress.js";
import { useAuth } from "../stores/auth.js";
import { sideUI } from "./sideUI.js";

const route = useRoute();
const progress = useProgress();
const auth = useAuth();
const r = computed(() => route.path.slice(1) || "home");
const co = computed(() => course(progress.curCourse));
const pc = computed(() => progress.coursePct(progress.curCourse));
const doneN = computed(() => courseIds(progress.curCourse).filter(progress.itemDone).length);

/* sections, filtered by the search box (a search opens every matching section) */
const sections = computed(() => {
  const q = progress.sq.trim().toLowerCase(), c = co.value, out = [];
  c.sections.forEach((s, j) => {
    const key = c.id + ":" + j, shown = s.ids.filter(id => !q || itemTitle(id).toLowerCase().includes(q));
    if (q && !shown.length) return;
    out.push({ key, title: s.t, count: s.ids.filter(progress.itemDone).length + "/" + s.ids.length, open: q ? true : progress.openSec.has(key), items: shown.map(id => ({ id, h: itemHref(id), t: itemTitle(id), done: progress.itemDone(id), icon: itemIcon(id) })), locked: false });
  });
  (c.later || []).forEach(l => {
    const key = c.id + ":later" + l[0], shown = l[3].filter(x => !q || x.toLowerCase().includes(q));
    if (q && !shown.length) return;
    out.push({ key, title: l[1], count: "0/" + l[3].length, open: q ? true : progress.openSec.has(key), soon: shown, locked: true });
  });
  return out;
});
function toggle(key) { if (progress.openSec.has(key)) progress.openSec.delete(key); else progress.openSec.add(key); }
function onClick(ev) { if (ev.target.closest("a")) sideUI.show = false; }
</script>

<template>
  <aside class="side" :class="{ show: sideUI.show }" id="side" aria-label="Course contents" @click="onClick">
    <RouterLink class="back" to="/home"><Ic name="back" />All courses</RouterLink>
    <h2 class="ctitle" id="ctitle">{{ co.name }}</h2>
    <div class="cprog"><span class="big"><span id="cpct">{{ pc }}</span>%</span><span class="meta" id="ccount">{{ doneN }}/{{ courseSize(progress.curCourse) }}</span></div>
    <div class="bar" id="cbar" role="progressbar" aria-label="Course progress" aria-valuemin="0" aria-valuemax="100" :aria-valuenow="pc"><i :style="{ width: pc + '%' }"></i></div>
    <label class="search"><Ic name="search" /><input type="search" id="sq" placeholder="Search lessons" aria-label="Search lessons" autocomplete="off" :value="progress.sq" @input="progress.sq = $event.target.value"></label>
    <div id="sections">
      <div v-for="s in sections" :key="s.key" class="sec" :class="{ open: s.open }">
        <button class="sechead" :data-sec="s.key" :aria-expanded="String(s.open)" @click="toggle(s.key)"><Ic :name="s.locked ? 'lock' : 'book'" /><span class="sect">{{ s.title }}</span><span class="cnt">{{ s.count }}</span><Ic name="chev" /></button>
        <ul v-if="s.open" class="lsn">
          <template v-if="!s.locked">
            <li v-for="it in s.items" :key="it.id"><RouterLink :to="'/' + it.h" :aria-current="r === it.h ? 'page' : null" :class="{ done: it.done }" active-class="" exact-active-class=""><Ic :name="it.done ? 'check' : it.icon" /><span>{{ it.t }}</span></RouterLink></li>
          </template>
          <template v-else>
            <li v-for="x in s.soon" :key="x"><span class="soon"><Ic name="doc" /><span>{{ x }}</span></span></li>
          </template>
        </ul>
      </div>
      <p v-if="!sections.length" class="meta">No lesson matches that search.</p>
    </div>
    <p class="sync" id="sync">{{ auth.syncText }}</p>
  </aside>
</template>
