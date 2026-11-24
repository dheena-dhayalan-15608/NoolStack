/* Details shared by the privacy and contact pages, from LEGAL in data/content.js. */
import { LEGAL } from "../data/content.js";
export const who = LEGAL.owner ? LEGAL.owner : "the owner of NoolStack";
export const mail = LEGAL.email || "";
export const phone = LEGAL.phone || "";
export const phoneShown = phone.replace(/(\d{5})(\d{5})/, "$1 $2");
export const draft = !LEGAL.owner;
