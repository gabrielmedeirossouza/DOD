import { promises as fs } from 'fs';
import { join, resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function generateIndex(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });

  const files = entries
    .filter(
      (e) => e.isFile() && e.name.endsWith('.ts') && e.name !== 'index.ts',
    )
    .map((e) => e.name);

  const subdirs = entries.filter((e) => e.isDirectory()).map((e) => e.name);

  const exportLines = files.map((name) => {
    const base = name.replace(/\.ts$/, '');
    return `export * from './${base}';`;
  });

  const content = exportLines.join('\n') + (exportLines.length ? '\n' : '');

  await fs.writeFile(join(dir, 'index.ts'), content, 'utf8');
  console.log(`✔️  ${dir}`);

  for (const sub of subdirs) {
    await generateIndex(join(dir, sub));
  }
}

const root = resolve(__dirname, '../Source');
generateIndex(root).catch((err) => {
  console.error(err);
  process.exit(1);
});
