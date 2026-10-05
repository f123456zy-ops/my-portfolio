import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import {
  AI_DELIVERABLES,
  AI_METRICS,
  CAPABILITIES,
  CONTACT,
  EXPERIENCE,
  SITE_PROFILE,
} from "../src/content/portfolio.js";

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const outputPath = resolve(scriptDirectory, "resume-content.json");
const snapshot = {
  profile: SITE_PROFILE,
  aiDeliverables: AI_DELIVERABLES.map(({ title }) => title),
  aiMetrics: AI_METRICS,
  capabilities: CAPABILITIES,
  experience: EXPERIENCE,
  contact: CONTACT,
};

await mkdir(dirname(outputPath), { recursive: true });
await writeFile(outputPath, `${JSON.stringify(snapshot, null, 2)}\n`);
process.stdout.write(`Wrote ${outputPath}\n`);
