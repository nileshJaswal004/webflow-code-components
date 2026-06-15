#!/usr/bin/env node
/**
 * Component Scaffolding Script
 * Usage: npm run create:component MyComponentName
 *
 *   src/components/MyComponentName/MyComponentName.jsx
 *   src/components/MyComponentName/MyComponentName.css
 *   src/components/MyComponentName/MyComponentName.webflow.jsx
 *   src/components/MyComponentName/index.js
 *
 * Then adds the export to src/components/index.ts
 */

const fs = require('fs');
const path = require('path');

// ── Input validation ────────────────────────────────────────────────────────
const name = process.argv[2];

if (!name) {
  console.error('\n❌  Please provide a component name:');
  console.error('   npm run create:component MyComponentName\n');
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

if (fs.existsSync(compDir)) {
  console.error(`\n❌  Component "${name}" already exists at ${compDir}\n`);
  process.exit(1);
}

// ── Templates ───────────────────────────────────────────────────────────────
const tsx = `\
import React from 'react';
import './${name}.css';

export const ${name} = ({ title = '${name}' }) => {
  return (
    <div className="wf-${name.toLowerCase()}">
      <h2 className="wf-${name.toLowerCase()}__title">{title}</h2>
    </div>
  );
};
`;

const css = `\
/* ─── ${name} ─── */
.wf-${name.toLowerCase()} {
  padding: var(--wf-spacing--lg);
  border-radius: var(--wf-border-radius--lg);
  background: var(--card-bg);
  border: 1px solid var(--glass-border);
  box-shadow: var(--wf-shadow--md);
  font-family: var(--wf-font-family--base);
}

.wf-${name.toLowerCase()}__title {
  font-family: var(--wf-font-family--heading);
  font-size: var(--wf-font-size--xl);
  font-weight: var(--wf-font-weight--bold);
  color: var(--text-color);
  margin: 0;
}
`;

const webflow = `\
import { declareComponent } from '@webflow/react';
import { props } from '@webflow/data-types';
import { ${name} } from './${name}';

export default declareComponent(${name}, {
  name: '${name}',
  description: 'A ${name} component.',
  group: 'General',
  props: {
    title: props.String({
      name: 'Title',
      defaultValue: '${name}',
    }),
    // Add more Webflow props here
  },
});
`;

const index = `export * from './${name}';\n`;

// ── Write files ─────────────────────────────────────────────────────────────
fs.mkdirSync(compDir, { recursive: true });
fs.writeFileSync(path.join(compDir, `${name}.jsx`),          tsx);
fs.writeFileSync(path.join(compDir, `${name}.css`),          css);
fs.writeFileSync(path.join(compDir, `${name}.webflow.jsx`),  webflow);
fs.writeFileSync(path.join(compDir, 'index.js'),             index);

// ── Update barrel export ─────────────────────────────────────────────────────
let barrel = fs.readFileSync(barrelFile, 'utf8');
const exportLine = `export * from './${name}';\n`;
if (!barrel.includes(exportLine)) {
  barrel += exportLine;
  fs.writeFileSync(barrelFile, barrel);
}

// ── Done ─────────────────────────────────────────────────────────────────────
console.log(`
✅  Component "${name}" created successfully!

   src/components/${name}/
   ├── ${name}.jsx          ← React component
   ├── ${name}.css          ← Styles
   ├── ${name}.webflow.jsx  ← Webflow registration
   └── index.js             ← Re-export

📋  Next steps:
   1. Edit the files above with your component logic
   2. Open src/pages/ComponentsDisplayPage.jsx
   3. Follow the STEP 1 and STEP 2 comments to add a preview entry
   4. Run: npm start
`);
