import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

/* In development there is no Catalyst server. Answer its SDK path with a 404, so the
   init script's onerror marks the page as "not on Catalyst" and the site runs in
   preview mode (guest progress, Debug Desk stand-in), as the legacy site did. */
const noCatalystInDev = {
  name: "no-catalyst-in-dev",
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      if (req.url && (req.url.startsWith("/__catalyst/") || req.url.startsWith("/server/"))) {
        res.statusCode = 404;
        res.setHeader("Content-Type", "text/plain");
        res.end("Not available in development");
        return;
      }
      next();
    });
  }
};

export default defineConfig({
  base: "./",
  /* Images, videos and vendor scripts live in public/ and are referenced relative to the page, as on the legacy site. */
  plugins: [vue({ template: { transformAssetUrls: false } }), noCatalystInDev],
  build: {
    outDir: "../client",
    emptyOutDir: true
  }
});
