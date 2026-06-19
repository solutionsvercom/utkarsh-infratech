/**
 * Generates compressed WebP variants for portfolio and service images.
 * Skips files that are already up to date (source mtime <= webp mtime).
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const frontendRoot = path.join(__dirname, '..');

const IMAGE_EXT = /\.(jpe?g|png)$/i;

async function optimizeFile(inputPath, outputPath, { maxWidth, quality }) {
  const inputStat = fs.statSync(inputPath);
  if (fs.existsSync(outputPath)) {
    const outputStat = fs.statSync(outputPath);
    if (outputStat.mtimeMs >= inputStat.mtimeMs) {
      return { skipped: true, inputPath };
    }
  }

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });

  await sharp(inputPath)
    .rotate()
    .resize({ width: maxWidth, withoutEnlargement: true })
    .webp({ quality, effort: 4 })
    .toFile(outputPath);

  const before = inputStat.size;
  const after = fs.statSync(outputPath).size;
  return { skipped: false, inputPath, before, after };
}

async function optimizeDir(inputDir, options) {
  if (!fs.existsSync(inputDir)) return [];

  const entries = fs.readdirSync(inputDir).filter((name) => IMAGE_EXT.test(name));
  const results = [];

  for (const name of entries) {
    const inputPath = path.join(inputDir, name);
    const stem = name.replace(IMAGE_EXT, '');
    const outputName = options.outName?.(name) ?? `${stem}.webp`;
    const outputPath = path.join(options.outputDir ?? inputDir, outputName);
    results.push(await optimizeFile(inputPath, outputPath, options));
  }

  return results;
}

const serviceNameMap = {
  'Residential_construction.jpeg': 'residential-construction.webp',
  'Commercial_construction.jpeg': 'commercial-construction.webp',
  'infrastructure_construction.jpeg': 'infrastructure-construction.webp',
  'Renovation_construction.jpeg': 'renovation-construction.webp',
};

async function main() {
  const portfolioResults = await optimizeDir(
    path.join(frontendRoot, 'public/portfolio/projects'),
    { maxWidth: 1200, quality: 82 },
  );

  const servicesOut = path.join(frontendRoot, 'public/images/services');
  const assetsDir = path.join(frontendRoot, 'src/assets/images');
  const serviceResults = [];

  for (const [sourceName, outName] of Object.entries(serviceNameMap)) {
    const inputPath = path.join(assetsDir, sourceName);
    if (!fs.existsSync(inputPath)) continue;
    serviceResults.push(
      await optimizeFile(inputPath, path.join(servicesOut, outName), {
        maxWidth: 960,
        quality: 82,
      }),
    );
  }

  const all = [...portfolioResults, ...serviceResults];
  const optimized = all.filter((r) => !r.skipped);
  const skipped = all.filter((r) => r.skipped);

  console.log(`Optimized ${optimized.length} image(s), skipped ${skipped.length} up-to-date.`);

  for (const r of optimized) {
    const saved = r.before - r.after;
    const pct = Math.round((saved / r.before) * 100);
    console.log(
      `  ${path.basename(r.inputPath)}: ${Math.round(r.before / 1024)}KB → ${Math.round(r.after / 1024)}KB (-${pct}%)`,
    );
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
