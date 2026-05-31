// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

const isStaticExport = process.env.STATIC_EXPORT === "true";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    server: { entry: "server" },
    ...(isStaticExport ? { spa: { enabled: true, prerender: { crawlLinks: true } } } : {}),
  },
  // Node server for most hosts; disable nitro for static export (GitHub Pages, etc.).
  nitro: isStaticExport ? false : { preset: "node-server" },
  vite: {
    // GitHub Pages project site: set GITHUB_PAGES=true when building for deploy
    base: process.env.GITHUB_PAGES === "true" ? "/confidential-report/" : "/",
  },
});
