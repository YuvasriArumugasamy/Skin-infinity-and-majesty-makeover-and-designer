const fs = require('fs');
const path = require('path');

const projectRoot = __dirname;
const publicDir = path.join(projectRoot, 'frontend', 'public');
const srcDir = path.join(projectRoot, 'frontend', 'src');
const htmlFile = path.join(projectRoot, 'frontend', 'index.html');

// Helper to clean filename
function cleanFilename(name) {
  const ext = path.extname(name);
  const base = path.basename(name, ext);
  
  let clean = base.toLowerCase();
  
  // Replace & with -and-
  clean = clean.replace(/&/g, 'and');
  
  // Replace spaces, commas, special characters with a single hyphen
  clean = clean.replace(/[^a-z0-9]+/g, '-');
  
  // Trim start/end hyphens
  clean = clean.replace(/^-+|-+$/g, '');
  
  // Fix specific typos if needed
  if (clean.includes('hydrs')) {
    clean = clean.replace('hydrs', 'hydra');
  }
  
  return clean + ext;
}

function getFilesRecursively(dir, extensions) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFilesRecursively(fullPath, extensions));
    } else {
      if (extensions.includes(path.extname(file))) {
        results.push(fullPath);
      }
    }
  });
  return results;
}

function main() {
  if (!fs.existsSync(publicDir)) {
    console.error('Public directory not found at:', publicDir);
    return;
  }
  
  const files = fs.readdirSync(publicDir);
  const renameMap = {};
  
  files.forEach(file => {
    const ext = path.extname(file).toLowerCase();
    // Only process images/videos
    if (!['.webp', '.png', '.jpg', '.jpeg', '.mp4'].includes(ext)) {
      return;
    }
    
    // Check if name has spaces or uppercase letters or invalid chars
    const cleaned = cleanFilename(file);
    if (cleaned !== file) {
      renameMap[file] = cleaned;
    }
  });
  
  const renameKeys = Object.keys(renameMap);
  if (renameKeys.length === 0) {
    console.log('No assets with spaces or uppercase names found to rename.');
    return;
  }
  
  console.log('Renaming Map generated:');
  console.log(JSON.stringify(renameMap, null, 2));
  
  // 1. Rename files on disk
  renameKeys.forEach(oldName => {
    const oldPath = path.join(publicDir, oldName);
    const newName = renameMap[oldName];
    const newPath = path.join(publicDir, newName);
    
    if (fs.existsSync(oldPath)) {
      fs.renameSync(oldPath, newPath);
      console.log(`Renamed: "${oldName}" -> "${newName}"`);
    } else {
      console.warn(`File not found: ${oldPath}`);
    }
  });
  
  // 2. Scan and replace in src files and index.html
  const codeFiles = getFilesRecursively(srcDir, ['.jsx', '.js', '.css']);
  if (fs.existsSync(htmlFile)) {
    codeFiles.push(htmlFile);
  }
  
  codeFiles.forEach(filePath => {
    let content = fs.readFileSync(filePath, 'utf8');
    let hasChanged = false;
    
    renameKeys.forEach(oldName => {
      const newName = renameMap[oldName];
      
      // Escape special characters for regex
      const escapedOld = oldName.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
      // Look for the filename referenced as a path /filename.webp or filename.webp
      const regex = new RegExp(escapedOld, 'g');
      
      if (regex.test(content)) {
        content = content.replace(regex, newName);
        hasChanged = true;
        console.log(`Replaced reference in: ${path.basename(filePath)} for "${oldName}"`);
      }
    });
    
    if (hasChanged) {
      fs.writeFileSync(filePath, content, 'utf8');
    }
  });
  
  console.log('Asset renaming and reference updating complete!');
}

main();
