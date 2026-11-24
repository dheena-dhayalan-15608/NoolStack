/* Seconds as m:ss. */
export const fmtT = x => { x = Math.max(0, Math.floor(x || 0)); return Math.floor(x / 60) + ":" + String(x % 60).padStart(2, "0"); };
