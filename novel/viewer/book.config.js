// Auto-discovers chapters from the novel/ directory.
// Edit the `parts` array to reorder, rename, or hide sections.

import { readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const NOVEL_ROOT = join(__dirname, '..');

function listMarkdown(subdir) {
  const abs = join(NOVEL_ROOT, subdir);
  return readdirSync(abs)
    .filter((f) => f.endsWith('.md'))
    .sort()
    .map((f) => ({
      file: join(subdir, f),
      slug: slugify(`${subdir}-${f.replace(/\.md$/, '')}`),
      title: titleize(f),
    }));
}

function slugify(s) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function titleize(filename) {
  return filename
    .replace(/\.md$/, '')
    .replace(/_v\d+$/i, '')
    .split(/[-_]/)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

export default {
  title: 'BAEBE',
  author: 'Ryan Yoshimoto',
  copyrightYear: new Date().getFullYear(),
  copyright: `© ${new Date().getFullYear()} Ryan Yoshimoto. All rights reserved.`,

  // Reading order. Comment out a section to hide it.
  // _novel-notes/ and appendices/ are intentionally excluded.
  parts: [
    { title: 'Prologue', chapters: listMarkdown('00-prologue') },
    { title: 'Part I — Chains', chapters: listMarkdown('part-i-chains') },
    { title: 'Part II — Truth', chapters: listMarkdown('part-ii-truth') },
    { title: 'Part III — Transcendence', chapters: listMarkdown('part-iii-transcendence') },
    { title: 'Interludes', chapters: listMarkdown('interludes') },
  ],
};
