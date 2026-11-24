<script setup>
/* Every course on the site, with its sections, and every planned course. */
import { COURSES, PLANNED } from "../data/content.js";
import { itemHref, itemTitle } from "../stores/progress.js";
import SylSection from "../components/SylSection.vue";
const planned = PLANNED.reduce((n, p) => n + p[1].length, 0);
</script>

<template>
  <h1>The full syllabus</h1><p class="lede" style="margin-top:.8rem">Every course on the site. {{ COURSES.length }} are ready to take, and {{ planned }} more are planned.</p>
  <section v-for="co in COURSES" :key="co.id"><h2>{{ co.name }}</h2><p class="meta">{{ co.blurb }}</p>
    <SylSection v-for="(s, k) in co.sections" :key="'s' + k" :title="s.t" chip="Ready" ok><li v-for="id in s.ids" :key="id"><RouterLink :to="'/' + itemHref(id)">{{ itemTitle(id) }}</RouterLink></li></SylSection>
    <SylSection v-for="(l, k) in co.later || []" :key="'l' + k" :title="l[1]" chip="Coming soon"><li v-for="x in l[3]" :key="x">{{ x }}</li></SylSection>
  </section>
  <section><h2>Planned courses</h2><p class="meta">These will be added one at a time. The lesson lists will appear here as each course is written.</p>
    <SylSection v-for="p in PLANNED" :key="p[0]" :title="p[0]" chip="Coming soon"><li v-for="x in p[1]" :key="x">{{ x }}</li></SylSection>
  </section>
</template>
