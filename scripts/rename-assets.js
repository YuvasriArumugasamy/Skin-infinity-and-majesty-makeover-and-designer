const fs = require('fs');
const path = require('path');

// Public directory relative to project root
const publicDir = path.resolve(__dirname, '..', 'frontend', 'public');

function normalizeName(oldName) {
  let name = oldName;
  // fix specific typo
  name = name.replace(/advance hydrs facial/i, 'advance-hydra-facial');
  // replace spaces and ampersands with hyphens
  name = name.replace(/\s+/g, '-');
  name = name.replace(/&/g, '-');
  // collapse multiple hyphens
  name = name.replace(/-+/g, '-');
  // lower case
  return name.toLowerCase();
}

function renameAssets() {
  const items = fs.readdirSync(publicDir);
  items.forEach(item => {
    const ext = path.extname(item).toLowerCase();
    if (!['.webp', '.png', '.jpg', '.jpeg', '.mp4', '.mov'].includes(ext)) return;
    const newName = normalizeName(item);
    if (newName !== item) {
      const oldPath = path.join(publicDir, item);
      const newPath = path.join(publicDir, newName);
      console.log(`Renaming ${item} → ${newName}`);
      fs.renameSync(oldPath, newPath);
    }
  });
}

renameAssets();
