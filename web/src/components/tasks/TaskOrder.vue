<script setup>
/* Put items in order: drag them (mouse, touch or pen), or use the arrow buttons. */
import { ref, computed, inject, nextTick } from "vue";
import { useProgress } from "../../stores/progress.js";
import { startOrder } from "../../services/tasks.js";
const { key, t, e, entry, refresh } = inject("task");
const progress = useProgress();
const list = ref(null);
const ord = computed(() => e.value.ord || startOrder(t.value.order.length));
const locked = computed(() => !!e.value.done);

function ensure() { const x = entry(); if (!x.ord) x.ord = startOrder(t.value.order.length); return x; }
function move(p, d) {
  const x = ensure(), q = p + d;
  if (q < 0 || q >= x.ord.length) return;
  [x.ord[p], x.ord[q]] = [x.ord[q], x.ord[p]];
  x.msg = "";
  progress.save();
  refresh();
  nextTick(() => {
    const box = list.value;
    if (!box) return;
    const nb = box.querySelector(`[data-pos="${q}"] [data-d="${d}"]:not([disabled])`) || box.querySelector(`[data-pos="${q}"] button:not([disabled])`);
    if (nb) nb.focus();
  });
}

/* drag to reorder */
let drag = null;
const over = ref(-1), dragging = ref(-1), dy = ref(0);
function down(ev, pos) {
  if (locked.value || ev.target.closest("button") || ev.button > 0) return;
  drag = { pos, y: ev.clientY };
  dragging.value = pos; dy.value = 0;
  ev.currentTarget.setPointerCapture(ev.pointerId);
  ev.preventDefault();
}
function moveDrag(ev) {
  if (!drag) return;
  dy.value = ev.clientY - drag.y;
  over.value = -1;
  [...list.value.children].forEach((x, k) => { if (k !== drag.pos) { const r = x.getBoundingClientRect(); if (ev.clientY >= r.top && ev.clientY <= r.bottom) over.value = k; } });
}
function up() {
  if (!drag) return;
  const from = drag.pos, to = over.value;
  drag = null; dragging.value = -1; dy.value = 0; over.value = -1;
  if (to < 0) return;
  const x = ensure();
  const [v] = x.ord.splice(from, 1);
  x.ord.splice(to, 0, v);
  x.msg = "";
  progress.save();
  refresh();
}
</script>

<template>
  <ol class="olist" :data-k="key" aria-label="Items to put in order" ref="list">
    <li v-for="(x, pos) in ord" :key="x" :class="['oitem', { fixed: locked, dragging: dragging === pos, over: over === pos }]" :data-pos="pos" :style="dragging === pos ? { transform: `translateY(${dy}px)` } : null" @pointerdown="down($event, pos)" @pointermove="moveDrag" @pointerup="up" @pointercancel="up">
      <span v-if="!locked" class="ograb" aria-hidden="true">⋮⋮</span><span class="otext">{{ t.order[x] }}</span>
      <span v-if="!locked" class="obtns"><button class="iconbtn obtn" data-a="omove" :data-pos="pos" data-d="-1" :aria-label="'Move ' + t.order[x] + ' up'" :disabled="pos === 0" @click="move(pos, -1)">↑</button><button class="iconbtn obtn" data-a="omove" :data-pos="pos" data-d="1" :aria-label="'Move ' + t.order[x] + ' down'" :disabled="pos === ord.length - 1" @click="move(pos, 1)">↓</button></span>
    </li>
  </ol>
</template>
