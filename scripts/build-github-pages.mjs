import { spawnSync } from "node:child_process";

const result = spawnSync("npm", ["run", "build:static"], {
  env: { ...process.env, GITHUB_PAGES: "true" },
  stdio: "inherit",
  shell: true,
});

process.exit(result.status ?? 1);
