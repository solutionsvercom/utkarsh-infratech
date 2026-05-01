const fs = require('fs');
const path = require('path');

const repoRoot = path.join(__dirname, '..', '..');
const srcDir = path.join(repoRoot, 'frontend', 'dist');
const destDir = path.join(__dirname, '..', 'public');

if (process.argv.includes('--verify-only')) {
  verifyPublicBundle(destDir);
  process.exit(0);
}

function rmrf(dir) {
  if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

function copyRecursive(from, to) {
  fs.mkdirSync(to, { recursive: true });
  for (const ent of fs.readdirSync(from, { withFileTypes: true })) {
    const srcPath = path.join(from, ent.name);
    const destPath = path.join(to, ent.name);
    if (ent.isDirectory()) {
      copyRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

/**
 * Fail fast if index.html points at JS/CSS that are not on disk (blank page / 404 in browser).
 */
function verifyPublicBundle(publicDir) {
  const indexPath = path.join(publicDir, 'index.html');
  if (!fs.existsSync(indexPath)) {
    console.error('public/index.html is missing after sync.');
    process.exit(1);
  }

  const assetsDir = path.join(publicDir, 'assets');
  if (!fs.existsSync(assetsDir)) {
    console.error('public/assets is missing after sync. The site will not load.');
    process.exit(1);
  }

  const html = fs.readFileSync(indexPath, 'utf8');
  const refs = new Set();
  const re = /(?:src|href)="(\/assets\/[^"?#]+)"/g;
  let m;
  while ((m = re.exec(html)) !== null) {
    refs.add(m[1]);
  }

  const missing = [];
  for (const ref of refs) {
    const segments = ref.split('/').filter(Boolean);
    const filePath = path.join(publicDir, ...segments);
    if (!fs.existsSync(filePath)) {
      missing.push({ ref, filePath });
    }
  }

  if (missing.length) {
    console.error('Bundle verification failed: index.html references files that are not in public/:');
    for (const { ref, filePath } of missing) {
      console.error(`  - ${ref} (expected at ${filePath})`);
    }
    process.exit(1);
  }

  if (refs.size > 0) {
    console.log(`Verified ${refs.size} asset path(s) from index.html exist under public/assets.`);
  }
}

if (!fs.existsSync(srcDir)) {
  console.error('Missing frontend/dist. Run: cd frontend && npm run build');
  process.exit(1);
}

rmrf(destDir);
copyRecursive(srcDir, destDir);
console.log('Copied frontend/dist -> backend/public');
verifyPublicBundle(destDir);
