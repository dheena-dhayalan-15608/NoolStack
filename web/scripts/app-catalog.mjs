/* Writes the course list for the NoolStack Apple app (iPhone, iPad, Mac): every course, section,
   lesson, checkpoint and project, with Tamil names, and the counts the app needs to work out
   progress the same way the site does (stores/progress.js).
   Run it after changing course content:  node scripts/app-catalog.mjs <path to the app's catalog.json> */
import { writeFileSync } from "node:fs";
import { COURSES, NODESC, NODES, NODES1, CHECKS, PROJECTS } from "../src/data/content.js";
import { TA } from "../src/i18n/ta.js";

const out = process.argv[2];
if (!out) { console.error("Give the path of the app's catalog.json"); process.exit(1); }

const NODE = {};
for (const n of NODESC.concat(NODES, NODES1)) NODE[n.id] = n;
const ui = s => (TA.ui && TA.ui[s]) || null;

function item(id) {
  const n = NODE[id];
  if (n) return { id, kind: "lesson", href: "lesson-" + id, no: n.no || "", title: n.t, ta: (TA.lessons[id] || {}).t || null, minutes: n.m || 0, P: n.P.length, Q: n.Q.length, T: n.T.length };
  const k = id.slice(3);
  if (id.startsWith("cp:")) return { id, kind: "checkpoint", href: "checkpoint-" + k, no: "", title: "Checkpoint quiz", ta: ui("Checkpoint quiz"), minutes: 0, cp: CHECKS[k].map(([st, key]) => ({ st, k: key })) };
  const p = PROJECTS[k];
  return { id, kind: "project", href: "project-" + k, no: "", title: "Project: " + p.data.name, ta: null, minutes: 0, store: p.store, checks: p.data.checks.length };
}

const courses = COURSES.map(c => {
  const t = (TA.courses || {})[c.id] || {};
  return {
    id: c.id, name: c.name, ta: t.name || null, blurb: c.blurb, taBlurb: t.blurb || null,
    sections: c.sections.map((s, i) => ({ t: s.t, ta: (t.sections || [])[i] || null, items: s.ids.map(item) })),
    later: (c.later || []).map(l => ({ level: l[0], name: l[1], ta: ui(l[1]), topics: l[3] }))
  };
});

writeFileSync(out, JSON.stringify({ courses }, null, 1) + "\n");
console.log("Wrote " + out + ": " + courses.map(c => c.name + " (" + c.sections.reduce((a, s) => a + s.items.length, 0) + " items)").join(", "));
