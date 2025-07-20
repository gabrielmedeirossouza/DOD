import { promises as fs } from 'fs';
import { join, resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const SOURCE_DIR = '../Source';
const SKIP_DIRS = ['Features']

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function hasTSFile(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  return entries.some(
    (e) => e.isFile() && e.name.endsWith('.ts') && e.name !== 'index.ts',
  );
}

async function generateIndex(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });

  const files = entries
    .filter(
      (e) => e.isFile() && e.name.endsWith('.ts') && e.name !== 'index.ts',
    )
    .map((e) => e.name);

  const subdirs = entries.filter((e) => e.isDirectory()).map((e) => e.name);

  const exportLines = [];

  for (const name of files) {
    const base = name.replace(/\.ts$/, '');
    exportLines.push(`export * from './${base}';`);
  }

  for (const sub of subdirs) {
    const subdirPath = join(dir, sub);
    if (await hasTSFile(subdirPath)) {
      exportLines.push(`export * from './${sub}';`);
    }
  }

  const content = exportLines.join('\n') + (exportLines.length ? '\n' : '');

  await fs.writeFile(join(dir, 'index.ts'), content, 'utf8');
  console.log(`✔️  ${dir}`);

  for (const sub of subdirs) {
    if (SKIP_DIRS.includes(sub)) {
        const subdirPath = join(dir, sub);
        const subEntries = await fs.readdir(subdirPath, { withFileTypes: true });
        for (const entry of subEntries) {
            if (entry.isDirectory()) {
            await generateIndex(join(subdirPath, entry.name));
            }
        }
        continue;
    }
    await generateIndex(join(dir, sub));
  }
}

const root = resolve(__dirname, SOURCE_DIR);
generateIndex(root).catch((err) => {
  console.error(err);
  process.exit(1);
});
