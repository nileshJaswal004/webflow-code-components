#!/usr/bin/env node
/**
 * Component Deletion Script
 * Usage: npm run delete:component MyComponentName
 *
 *   Deletes src/components/MyComponentName/
 *   Removes export from src/components/index.js
 *   Removes component preview from src/pages/ComponentsDisplayPage.jsx
 */

const fs = require('fs');
const path = require('path');

// ── Input validation ────────────────────────────────────────────────────────
const name = process.argv[2];

if (!name) {
  console.error('\n❌  Please provide a component name:');
  console.error('   npm run delete:component MyComponentName\n');
  process.exit(1);
}

if (!/^[A-Z][A-Za-z0-9]+$/.test(name)) {
  console.error('\n❌  Component name must be PascalCase (e.g. MyCard, SwiperCarousel).\n');
  process.exit(1);
}

// ── Paths ───────────────────────────────────────────────────────────────────
const root       = path.resolve(__dirname, '..');
const compDir    = path.join(root, 'src', 'components', name);
const barrelFile = path.join(root, 'src', 'components', 'index.js');
const displayPageFile = path.join(root, 'src', 'pages', 'ComponentsDisplayPage.jsx');

if (!fs.existsSync(compDir)) {
  console.error(`\n❌  Component "${name}" does not exist at ${compDir}\n`);
  process.exit(1);
}

// ── Delete folder ───────────────────────────────────────────────────────────
fs.rmSync(compDir, { recursive: true, force: true });

// ── Update barrel export ─────────────────────────────────────────────────────
if (fs.existsSync(barrelFile)) {
  let barrel = fs.readFileSync(barrelFile, 'utf8');
  const exportLine = `export * from './${name}';\n`;
  if (barrel.includes(exportLine)) {
    barrel = barrel.replace(exportLine, '');
    fs.writeFileSync(barrelFile, barrel);
  }
}

// ── Update display page ──────────────────────────────────────────────────────
if (fs.existsSync(displayPageFile)) {
  let displayPage = fs.readFileSync(displayPageFile, 'utf8');
  
  // Try to remove import
  const importRegex = new RegExp(`^import\\s+\\{\\s*${name}\\s*\\}\\s+from\\s+['"][^'"]+['"];?[\\r\\n]*`, 'gm');
  displayPage = displayPage.replace(importRegex, '');

  const lines = displayPage.split('\n');
  const newLines = [];
  let inComponent = false;
  let bracketDepth = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (!inComponent) {
      if (line.match(new RegExp(`^\\s*name:\\s*['"]${name}['"]`)) && newLines.length > 0 && newLines[newLines.length - 1].trim() === '{') {
        newLines.pop();
        inComponent = true;
        bracketDepth = 1;
      } else if (line.match(new RegExp(`\\{\\s*name:\\s*['"]${name}['"]`))) {
        inComponent = true;
        bracketDepth = (line.match(/\\{/g) || []).length - (line.match(/\\}/g) || []).length;
        if (bracketDepth <= 0) inComponent = false;
      } else {
        newLines.push(line);
      }
    } else {
      bracketDepth += (line.match(/\\{/g) || []).length;
      bracketDepth -= (line.match(/\\}/g) || []).length;
      if (bracketDepth <= 0) {
        inComponent = false;
      }
    }
  }
  
  fs.writeFileSync(displayPageFile, newLines.join('\n'));
}

// ── Done ─────────────────────────────────────────────────────────────────────
console.log(`
✅  Component "${name}" deleted successfully!

🗑️  Removed:
   - src/components/${name}/
   - Export in src/components/index.js
   - References in src/pages/ComponentsDisplayPage.jsx

📋  Next steps:
   1. Check src/pages/ComponentsDisplayPage.jsx to ensure it's clean and has no syntax errors.
   2. Run: npm run webflow:import
`);
