import { spawnSync } from "node:child_process";

const env = { ...process.env, STATIC_EXPORT: "true" };

const build = spawnSync("npm", ["run", "build"], {
  env,
  stdio: "inherit",
  shell: true,
});
if (build.status !== 0) process.exit(build.status ?? 1);

const post = spawnSync(process.execPath, ["scripts/postbuild-static.mjs"], {
  env,
  stdio: "inherit",
});
process.exit(post.status ?? 1);
