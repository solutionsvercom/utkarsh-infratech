const fs = require('fs');
const path = require('path');

const repoRoot = path.join(__dirname, '..', '..');
const srcDir = path.join(repoRoot, 'frontend', 'dist');
const destDir = path.join(__dirname, '..', 'public');

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

if (!fs.existsSync(srcDir)) {
  console.error('Missing frontend/dist. Run: cd frontend && npm run build');
  process.exit(1);
}

rmrf(destDir);
copyRecursive(srcDir, destDir);
console.log('Copied frontend/dist -> backend/public');
