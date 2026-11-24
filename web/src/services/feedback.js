/* Toast messages and party poppers, shared by every page.
   Toast.vue and PartyPoppers.vue draw what is kept here. */
import { reactive } from "vue";

export const toastState = reactive({ msg: "", badge: "", hidden: true, out: false });
let toastT;
/** Show a short message. badge is a badge id, to show its picture beside the message. */
export function toast(m, badge) {
  toastState.msg = m;
  toastState.badge = badge || "";
  toastState.out = false;
  toastState.hidden = false;
  clearTimeout(toastT);
  toastT = setTimeout(hideToast, badge ? 2800 : 2200);
}
export function hideToast() {
  if (toastState.hidden) return;
  toastState.out = true;
  clearTimeout(toastT);
  toastT = setTimeout(() => { toastState.hidden = true; toastState.out = false; }, 250);
}

export const partyState = reactive({ bursts: [] });
let partyAt = 0, burstId = 0;
const COLS = ["#F2B13C", "#63C7E6", "#4FD08B", "#FF7B6B", "#ECEEF2"];
export function party(n) {
  const now = Date.now();
  if (now - partyAt < 600) return;
  partyAt = now;
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const bits = [];
  for (let i = 0; i < n; i++) {
    const right = i % 2;
    bits.push("left:" + (right ? 94 : 6) + "%;background:" + COLS[i % COLS.length] + ";--dx:" + ((right ? -1 : 1) * (6 + Math.random() * 44)) + "vw;--dy:-" + (25 + Math.random() * 55) + "vh;--r:" + (Math.random() * 900 - 450) + "deg;animation-delay:" + (Math.random() * .18) + "s;width:" + (6 + Math.random() * 6) + "px;height:" + (9 + Math.random() * 9) + "px");
  }
  const id = ++burstId;
  partyState.bursts.push({ id, bits });
  setTimeout(() => { const k = partyState.bursts.findIndex(b => b.id === id); if (k >= 0) partyState.bursts.splice(k, 1); }, 2400);
}
