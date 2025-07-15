#!/usr/bin/env node

const fs = require('fs').promises;
const path = require('path');

async function generateIndex(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });

  const files = entries
    .filter(e => e.isFile() && e.name.endsWith('.ts') && e.name !== 'index.ts')
    .map(e => e.name);

  const subdirs = entries.filter(e => e.isDirectory()).map(e => e.name);

  const exportLines = files.map(name => {
    const base = name.replace(/\.ts$/, '');
    return `export * from './${base}';`;
  });

  const content = exportLines.join('\n') + (exportLines.length ? '\n' : '');

  await fs.writeFile(path.join(dir, 'index.ts'), content, 'utf8');
  console.log(`✔️  index.ts gerado em ${dir}`);

  for (const sub of subdirs) {
    await generateIndex(path.join(dir, sub));
  }
}

const root = path.resolve(__dirname, '../Source');
generateIndex(root).catch(err => {
  console.error(err);
  process.exit(1);
});
