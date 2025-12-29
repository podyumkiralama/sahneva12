import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const key = process.env.INDEXNOW_KEY;

if (!key) {
  console.log("[IndexNow] INDEXNOW_KEY missing, skipping key file generation.");
  process.exit(0);
}

mkdirSync("public", { recursive: true });

const filePath = join("public", `${key}.txt`);
writeFileSync(filePath, `${key}\n`, "utf8");

console.log(`[IndexNow] Wrote key file: ${filePath}`);
