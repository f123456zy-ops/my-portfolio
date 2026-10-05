import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { extname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const MIME_EXTENSIONS = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/gif": ".gif",
  "image/svg+xml": ".svg",
};

export function extractDataImages(html) {
  return [...html.matchAll(/data:(image\/[a-z0-9.+-]+);base64,([a-z0-9+/=]+)/gi)].map(
    (match, index) => ({
      index: index + 1,
      mime: match[1].toLowerCase(),
      bytes: Buffer.from(match[2], "base64"),
    }),
  );
}

export async function writeExtractedImages(inputPath, outputDirectory) {
  const html = await readFile(inputPath, "utf8");
  const images = extractDataImages(html);

  await mkdir(outputDirectory, { recursive: true });

  const manifest = [];
  for (const image of images) {
    const extension = MIME_EXTENSIONS[image.mime] ?? extname(inputPath) ?? ".bin";
    const filename = `image-${String(image.index).padStart(3, "0")}${extension}`;
    await writeFile(resolve(outputDirectory, filename), image.bytes);
    manifest.push({
      filename,
      mime: image.mime,
      bytes: image.bytes.byteLength,
      sha256: createHash("sha256").update(image.bytes).digest("hex"),
    });
  }

  await writeFile(
    resolve(outputDirectory, "manifest.json"),
    `${JSON.stringify(manifest, null, 2)}\n`,
  );

  return manifest;
}

const isCommandLine = process.argv[1]
  ? fileURLToPath(import.meta.url) === resolve(process.argv[1])
  : false;

if (isCommandLine) {
  const [, , inputPath, outputDirectory] = process.argv;
  if (!inputPath || !outputDirectory) {
    throw new Error("Usage: extract-legacy-assets.mjs <input.html> <output-directory>");
  }

  const manifest = await writeExtractedImages(inputPath, outputDirectory);
  process.stdout.write(`Extracted ${manifest.length} images to ${outputDirectory}\n`);
}
