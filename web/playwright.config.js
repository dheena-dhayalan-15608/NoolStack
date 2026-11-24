import { defineConfig } from "@playwright/test";

/* Smoke test: builds nothing itself. Run `npm run build` first, then `npm run test:smoke`.
   The built site in ../client is served with `vite preview`. */
export default defineConfig({
  testDir: "tests",
  timeout: 120000,
  use: { baseURL: "http://localhost:4173" },
  webServer: {
    command: "npx vite preview --port 4173 --strictPort",
    url: "http://localhost:4173",
    reuseExistingServer: true
  }
});
