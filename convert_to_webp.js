const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const publicDir = path.join(__dirname, 'frontend', 'public');
const srcDir = path.join(__dirname, 'frontend');

console.log('Checking image conversion tool...');

// Check if sharp or pillow is installed, install sharp if needed
let hasSharp = false;
try {
  require.resolve('sharp');
  hasSharp = true;
} catch (e) {
  console.log('Installing sharp package for fast WebP image conversion...');
  try {
    execSync('npm install --no-save sharp', { cwd: path.join(__dirname, 'frontend'), stdio: 'inherit' });
    hasSharp = true;
  } catch (err) {
    console.log('Could not auto-install sharp via npm. Will try python if available.');
  }
}

async function convertImages() {
  if (!hasSharp) {
    console.log('Executing Python converter script...');
    try {
      execSync('python convert_to_webp.py', { stdio: 'inherit' });
      return;
    } catch (err) {
      console.error('Python not found. Please run: python convert_to_webp.py in terminal.');
      return;
    }
  }

  const sharp = require(path.join(__dirname, 'frontend', 'node_modules', 'sharp'));
  const files = fs.readdirSync(publicDir);
  const convertedFiles = {};
  let totalOld = 0;
  let totalNew = 0;

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (['.png', '.jpg', '.jpeg'].includes(ext)) {
      const oldPath = path.join(publicDir, file);
      const baseName = path.basename(file, ext);
      const newFile = `${baseName}.webp`;
      const newPath = path.join(publicDir, newFile);

      try {
        const oldSize = fs.statSync(oldPath).size;
        await sharp(oldPath)
          .webp({ quality: 82 })
          .toFile(newPath);
        
        const newSize = fs.statSync(newPath).size;
        totalOld += oldSize;
        totalNew += newSize;
        
        const pct = ((1 - newSize / oldSize) * 100).toFixed(1);
        console.log(`Converted: ${file} (${(oldSize / 1024).toFixed(1)} KB -> ${(newSize / 1024).toFixed(1)} KB | -${pct}%)`);
        
        convertedFiles[file] = newFile;
        fs.unlinkSync(oldPath);
      } catch (err) {
        console.error(`Error converting ${file}:`, err.message);
      }
    }
  }

  console.log(`\nTotal saved: ${((totalOld - totalNew) / (1024 * 1024)).toFixed(2)} MB!`);

  // Update code references
  updateReferences(convertedFiles);
}

function updateReferences(convertedFiles) {
  console.log('\nUpdating code references to .webp...');
  function walk(dir) {
    const list = fs.readdirSync(dir);
    for (const item of list) {
      const full = path.join(dir, item);
      const stat = fs.statSync(full);
      if (stat.isDirectory()) {
        walk(full);
      } else if (['.jsx', '.js', '.html', '.css'].includes(path.extname(item))) {
        let content = fs.readFileSync(full, 'utf8');
        let updated = content;
        for (const [oldName, newName] of Object.entries(convertedFiles)) {
          updated = updated.replace(new RegExp(escapeRegExp(oldName), 'g'), newName);
        }
        if (updated !== content) {
          fs.writeFileSync(full, updated, 'utf8');
          console.log(`  Updated: ${path.basename(full)}`);
        }
      }
    }
  }
  walk(srcDir);
  console.log('\nAll done!');
}

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

convertImages();
