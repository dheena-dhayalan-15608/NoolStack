<script setup>
/* Practice terminal (the lesson widget): a safe pretend terminal that knows pwd, ls, cd and mkdir,
   with four goals to reach. ↑ and ↓ bring back earlier commands. */
import { ref, computed, nextTick } from "vue";
const fs = { Users: { ana: { Desktop: {}, Documents: { "notes.txt": null } } } }, home = ["Users", "ana"];
const cwd = ref(home.slice()), log = ref([]), logEl = ref(null), inp = ref(null);
const hist = [];
let hp = 0;
const been = ref(false), back = ref(false), tick = ref(0);
const get = p => { let n = fs; for (const s of p) { if (n === null || typeof n !== "object" || !(s in n)) return undefined; n = n[s]; } return n; };
const res = p => { const parts = p.startsWith("/") ? [] : p.startsWith("~") ? home.slice() : cwd.value.slice(); for (const s of p.replace(/^~/, "").split("/")) { if (!s || s === ".") continue; if (s === "..") parts.pop(); else parts.push(s); } return parts; };
const prompt = computed(() => "ana " + (cwd.value.join("/") === home.join("/") ? "~" : cwd.value.length ? cwd.value[cwd.value.length - 1] : "/") + " %");
const goals = [["Make a folder called python_course", () => get(home.concat("python_course")) !== undefined], ["Go into python_course", () => been.value], ["Make a folder called level0 inside it", () => get(home.concat("python_course", "level0")) !== undefined], ["Come back to your home folder", () => back.value]];
const status = computed(() => { void tick.value; return goals.map(x => x[1]()); });
const out = (t, dim) => { log.value.push({ t, dim }); nextTick(() => { if (logEl.value) logEl.value.scrollTop = logEl.value.scrollHeight; }); };
function run(line) {
  out(prompt.value + " " + line, true);
  const a = (line.match(/"[^"]*"|\S+/g) || []).map(x => x.replace(/^"|"$/g, ""));
  const c = a.shift();
  if (!c) return;
  if (c === "$" || c === "%" || c === ">") return out("Leave out the prompt symbol. Type only the command.");
  if (c === "pwd") out("/" + cwd.value.join("/"));
  else if (c === "ls" || c === "dir") { const p = a[0] || ".", n = get(res(p)); if (n === undefined) out("ls: " + p + ": No such file or directory"); else if (n === null) out(p); else { const k = Object.keys(n).sort().map(x => n[x] === null ? x : x + "/"); if (k.length) out(k.join("    ")); } }
  else if (c === "cd") { const p = a[0] || "~", r = res(p), n = get(r); if (n === undefined) out("cd: no such file or directory: " + p); else if (n === null) out("cd: not a directory: " + p); else { cwd.value = r; if (r.join("/") === "Users/ana/python_course") been.value = true; if (been.value && r.join("/") === "Users/ana") back.value = true; } }
  else if (c === "mkdir") { if (!a.length) out("usage: mkdir folder_name"); for (const p of a) { const r = res(p), par = get(r.slice(0, -1)); if (par === undefined || par === null || !r.length) out("mkdir: " + p + ": No such file or directory"); else if (r[r.length - 1] in par) out("mkdir: " + p + ": File exists"); else par[r[r.length - 1]] = {}; } }
  else if (c === "clear") log.value = [];
  else if (c === "help") out("Commands here: pwd, ls, cd, mkdir, clear");
  else out("zsh: command not found: " + c);
}
function onKey(e) {
  const el = inp.value;
  if (e.key === "Enter") { const v = el.value.trim(); el.value = ""; if (v) { hist.push(v); hp = hist.length; } run(v); tick.value++; }
  else if (e.key === "ArrowUp" && hist.length) { e.preventDefault(); hp = Math.max(0, hp - 1); el.value = hist[hp]; }
  else if (e.key === "ArrowDown" && hist.length) { e.preventDefault(); hp = Math.min(hist.length, hp + 1); el.value = hist[hp] || ""; }
}
</script>

<template>
  <h3>Practice terminal</h3><p>This is a safe pretend terminal. It knows pwd, ls, cd and mkdir. Type a command and press Enter.</p>
  <div class="termbox"><div class="termlog" id="tlog" aria-live="polite" ref="logEl"><div v-for="(l, k) in log" :key="k" :class="{ dim: l.dim }">{{ l.t }}</div></div><div class="termin"><span id="tpr">{{ prompt }}</span><input type="text" id="tin" ref="inp" aria-label="Type a command" autocomplete="off" autocapitalize="off" spellcheck="false" @keydown="onKey"></div></div>
  <ul class="goals" id="tgoals"><li v-for="(x, j) in goals" :key="j" :class="{ ok: status[j] }">{{ x[0] }}</li><li v-if="status.every(Boolean)" class="ok">All four done. You just navigated by typing.</li></ul>
</template>
