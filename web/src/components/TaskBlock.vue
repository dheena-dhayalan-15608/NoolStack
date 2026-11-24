<script setup>
/* One "Your turn" task. The answer area comes from the component for the task's kind
   (components/tasks/); the hints, checking and points are handled here. */
import { ref, computed, provide, nextTick } from "vue";
import { useProgress } from "../stores/progress.js";
import { party } from "../services/feedback.js";
import { loadPython, runProgram } from "../services/python.js";
import { TERMS, REPLS, PYOUT, CHECKS_FILL, CHECKS_PY, CHECKS_REPL, CHECKS_TERM, checkText, startOrder, taskPoints, kindOf } from "../services/tasks.js";
import { resetPrompt } from "../services/python.js";
import DoneMsg from "./DoneMsg.vue";
import TaskText from "./tasks/TaskText.vue";
import TaskChoice from "./tasks/TaskChoice.vue";
import TaskSort from "./tasks/TaskSort.vue";
import TaskFill from "./tasks/TaskFill.vue";
import TaskOrder from "./tasks/TaskOrder.vue";
import TaskTerm from "./tasks/TaskTerm.vue";
import TaskPy from "./tasks/TaskPy.vue";
import TaskRepl from "./tasks/TaskRepl.vue";

const props = defineProps({ n: Object, i: Number });
const progress = useProgress();
const panel = ref(null);
const fresh = ref(false);
const key = computed(() => props.n.id + "t" + props.i);
const t = computed(() => props.n.T[props.i]);
const kind = computed(() => kindOf(t.value));
const KINDS = { text: TaskText, choice: TaskChoice, sort: TaskSort, fill: TaskFill, order: TaskOrder, term: TaskTerm, py: TaskPy, repl: TaskRepl };
const body = computed(() => KINDS[kind.value] || null);
const e = computed(() => progress.S.task[key.value] || { hints: 0 });
const entry = () => progress.taskEntry(key.value);

/** After a change: focus the task (without scrolling), or the element matching sel inside it. */
function refresh(sel) {
  nextTick(() => {
    if (!panel.value) return;
    panel.value.focus({ preventScroll: true });
    if (sel) { const f = panel.value.querySelector(sel); if (f) f.focus(); }
  });
}
function win(auto) {
  const x = entry();
  x.done = 1; x.msg = ""; x.pts = taskPoints(x, auto);
  progress.save();
  fresh.value = true;
  refresh();
  party(40);
}
function verdict(res) {
  const x = entry();
  x.tries = (x.tries || 0) + 1;
  if (res === true) win(false);
  else { x.msg = typeof res === "string" ? res : "Not quite yet."; progress.save(); refresh(); }
}
const code = () => { const x = entry(); return x.code !== undefined ? x.code : (t.value.code || ""); };
/** Run the learner's program. useTest feeds the task's own test answers to input(). */
function pyRun(useTest, cb) {
  const x = entry(), src = code();
  const inputs = useTest && t.value.tin ? t.value.tin : (x.inp || "").split("\n");
  PYOUT[key.value] = "Loading the Python runner…";
  refresh();
  loadPython(ok => {
    if (!ok) { PYOUT[key.value] = "The Python runner could not load here. Check your connection and try again."; refresh(); return cb && cb(null); }
    const r = runProgram(src, inputs);
    PYOUT[key.value] = r.all || "(Nothing was printed.)";
    if (!cb) refresh();
    if (cb) cb(r, src);
  });
}
function check() {
  const x = entry(), tk = t.value, k = kind.value;
  if (k === "choice") {
    const p = (x.pick || []).slice().sort().join(), a = tk.ans.slice().sort().join();
    if (!x.pick || !x.pick.length) { x.msg = "Choose an answer first."; return refresh(); }
    return verdict(p === a || (tk.multi ? "Not quite. Check each choice again." : "Not that one. Try again."));
  }
  if (k === "sort") {
    const sel = x.sel || [];
    if (tk.items.some((_, i) => sel[i] === undefined || sel[i] === null)) { x.msg = "Give every item a group first."; return refresh(); }
    const right = tk.items.filter((it, i) => sel[i] === it[1]).length;
    return verdict(right === tk.items.length || (right + " of " + tk.items.length + " are right. Change the others and check again."));
  }
  if (k === "fill") {
    const v = x.vals || [];
    if (tk.fields.some((_, j) => !(v[j] || "").trim())) { x.msg = "Fill in every box first."; return refresh(); }
    return verdict(tk.accept ? CHECKS_FILL.accept(v, tk) : CHECKS_FILL[tk.check](v, tk));
  }
  if (k === "py") {
    if (!code().trim()) { x.msg = "Write some code first."; return refresh(); }
    return pyRun(true, (r, c) => {
      if (!r) { x.msg = "The Python runner could not load, so your answer could not be checked."; return refresh(); }
      if (r.err) return verdict("Your program stopped with an error. Fix it, then check again.");
      verdict(CHECKS_PY[tk.check](r, c));
    });
  }
}
/* the terminal and the Python prompt are marked as soon as the goal is reached */
function auto() {
  const x = entry();
  if (x.done) return;
  let ok = false;
  if (kind.value === "term") ok = CHECKS_TERM[t.value.check](TERMS[key.value] || {});
  else if (kind.value === "repl") ok = CHECKS_REPL[t.value.check](REPLS[key.value] || []) === true;
  if (ok) win(true);
}
function hintMore() { const x = entry(); x.hints = Math.min(3, x.hints + 1); progress.save(); refresh(); }
function selfDone() { const x = entry(); x.done = 1; x.pts = [10, 7, 4, 2][x.hints]; progress.save(); fresh.value = true; refresh(); }
function submitText() {
  const x = entry(), v = x.ans || "";
  x.ans = v; x.msg = "";
  const fb = checkText(t.value, v);
  x.fb = fb; x.tries = (x.tries || 0) + 1;
  if (fb.pass) win(false); else { progress.save(); refresh("textarea"); }
}
function revealText() { const x = entry(); x.done = 1; x.pts = 2; x.msg = ""; progress.save(); refresh(); }
function checkOrder() {
  const x = entry();
  if (!x.ord) x.ord = startOrder(t.value.order.length);
  x.tries = (x.tries || 0) + 1;
  const right = x.ord.filter((v, p) => v === p).length;
  if (right === x.ord.length) { x.done = 1; x.pts = Math.max(2, [10, 7, 4, 2][x.hints] - (x.tries - 1) * 2); x.msg = ""; progress.save(); fresh.value = true; refresh(); party(40); }
  else { x.msg = right + " of " + x.ord.length + " are in the right place. Move the others and check again."; progress.save(); refresh(); }
}
function resetTerm() { delete TERMS[key.value]; refresh(".ttin"); }
function resetRepl() { delete REPLS[key.value]; resetPrompt(); refresh(".rin"); }

provide("task", { key, t, e, entry, refresh, check, auto, pyRun });
const doneLabel = computed(() => (kind.value === "text" || kind.value === "self" ? "Done. " : "Correct. ") + e.value.pts + " of 10 points.");
</script>

<template>
  <div class="panel" :id="'b-' + key" tabindex="-1" ref="panel">
    <h3>Task {{ i + 1 }}</h3><p>{{ t.p }}</p>
    <component :is="body" v-if="body" />
    <p v-if="e.msg && !e.done" class="fb no" role="status">{{ e.msg }}</p>
    <p v-for="(h, j) in t.h.slice(0, e.hints)" :key="j" class="hint"><b>Hint {{ j + 1 }}:</b> {{ h }}</p>
    <DoneMsg v-if="e.done" :text="doneLabel" :fresh="fresh" />
    <div v-else class="row">
      <button v-if="e.hints < 3" class="btn quiet small" data-a="thint" @click="hintMore">Show hint {{ e.hints + 1 }} of 3</button>
      <template v-if="kind === 'self'"><button class="btn small" data-a="tdone" @click="selfDone">I did it</button></template>
      <template v-else-if="kind === 'text'"><button class="btn small" data-a="tsubmit" @click="submitText">Check my answer</button><button v-if="(e.tries || 0) >= 3" class="btn quiet small" data-a="treveal" @click="revealText">Show the sample answer</button></template>
      <template v-else-if="kind === 'order'"><button class="btn small" data-a="ocheck" @click="checkOrder">Check my order</button></template>
      <template v-else-if="kind === 'term'"><button class="btn quiet small" data-a="treset" @click="resetTerm">Start the terminal again</button></template>
      <template v-else-if="kind === 'repl'"><button class="btn quiet small" data-a="rreset" @click="resetRepl">Clear the prompt</button></template>
      <template v-else-if="kind === 'py'"><button class="btn quiet small" data-a="pyrun" @click="pyRun(false)">Run</button><button class="btn small" data-a="tcheck" @click="check">Check my answer</button></template>
      <template v-else><button class="btn small" data-a="tcheck" @click="check">Check my answer</button></template>
    </div>
    <div v-if="e.done && (kind === 'term' || kind === 'repl')" class="row">
      <button v-if="kind === 'term'" class="btn quiet small" data-a="treset" @click="resetTerm">Start the terminal again</button>
      <button v-else class="btn quiet small" data-a="rreset" @click="resetRepl">Clear the prompt</button>
    </div>
  </div>
</template>
