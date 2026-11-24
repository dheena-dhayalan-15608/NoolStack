/* The Animations page's search, category and "Saved only" filter, kept while the site is open (as before). */
import { reactive } from "vue";
export const animFilter = reactive({ q: "", cat: "all", saved: false });
