/**
 * Copies PDF.js runtime assets (wasm decoders, cmaps, fonts) into public/pdfjs/
 * so getDocument({ wasmUrl, ... }) works in dev and production builds.
 */
import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
const frontendRoot = path.join(__dirname, '..');
const pdfjsRoot = path.dirname(require.resolve('pdfjs-dist/package.json'));
const destRoot = path.join(frontendRoot, 'public', 'pdfjs');

const ASSET_DIRS = ['wasm', 'cmaps', 'standard_fonts', 'iccs'];

function copyDir(from, to) {
  fs.mkdirSync(to, { recursive: true });
  for (const entry of fs.readdirSync(from, { withFileTypes: true })) {
    const src = path.join(from, entry.name);
    const dest = path.join(to, entry.name);
    if (entry.isDirectory()) {
      copyDir(src, dest);
    } else {
      fs.copyFileSync(src, dest);
    }
  }
}

function main() {
  fs.mkdirSync(destRoot, { recursive: true });
  for (const dir of ASSET_DIRS) {
    const src = path.join(pdfjsRoot, dir);
    if (!fs.existsSync(src)) {
      console.warn(`pdfjs-dist/${dir} not found, skipping.`);
      continue;
    }
    copyDir(src, path.join(destRoot, dir));
  }
  console.log(`Copied PDF.js assets to public/pdfjs/ (${ASSET_DIRS.join(', ')})`);
}

main();
