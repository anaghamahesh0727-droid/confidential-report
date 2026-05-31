import { copyFileSync, existsSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const outDir = join(process.cwd(), "dist", "client");
const shellPath = join(outDir, "_shell.html");
const indexPath = join(outDir, "index.html");

if (!existsSync(shellPath)) {
  console.error("[postbuild-static] Missing dist/client/_shell.html — run with STATIC_EXPORT=true");
  process.exit(1);
}

// SPA shell: same file for index + 404 so deep links work on static hosts (GitHub Pages, etc.)
copyFileSync(shellPath, indexPath);
copyFileSync(shellPath, join(outDir, "404.html"));

writeFileSync(join(outDir, ".nojekyll"), "");

console.log("[postbuild-static] Wrote index.html, 404.html, and .nojekyll in dist/client");
