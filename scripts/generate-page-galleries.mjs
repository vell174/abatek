import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const linksFile = path.join(root, 'ABATEK_UNIQUE_LINKS_NO_CITIES.md');
const sourceRoot = path.join(root, 'abatek-copy3');
const pagesRoot = path.join(root, 'app', 'data', 'pages');
const imagesRoot = path.join(root, 'public', 'images', 'gallery');
const extraSlugs = ['lentochnye-konvejery', 'rolgang', 'rezervuary'];

const listedSlugs = fs
  .readFileSync(linksFile, 'utf8')
  .split(/\r?\n/)
  .map((line) => line.match(/^https:\/\/abatek\.ru\/([^/]+)\//)?.[1])
  .filter(Boolean);
const slugs = [...new Set([...listedSlugs, ...extraSlugs])];

if (slugs.length !== 60) {
  throw new Error(`Expected 60 unique page slugs, received ${slugs.length}`);
}

fs.mkdirSync(imagesRoot, { recursive: true });

const decodeHtml = (value) =>
  value
    .replace(/&nbsp;|&#160;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;|&#34;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&laquo;/gi, '«')
    .replace(/&raquo;/gi, '»')
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/\s+/g, ' ')
    .trim();

const toTypeScriptString = (value) =>
  `'${value.replaceAll('\\', '\\\\').replaceAll("'", "\\'").replaceAll('\r', '').replaceAll('\n', '\\n')}'`;

let galleryPages = 0;
let totalEntries = 0;
const copiedImages = new Set();

for (const slug of slugs) {
  const sourceFile = path.join(sourceRoot, slug, 'index.html');
  const targetFile = path.join(pagesRoot, slug, 'gallery.ts');

  if (!fs.existsSync(sourceFile)) throw new Error(`Source HTML was not found: ${sourceFile}`);
  if (!fs.existsSync(path.dirname(targetFile)))
    throw new Error(`Page data directory was not found: ${path.dirname(targetFile)}`);

  const html = fs.readFileSync(sourceFile, 'utf8');
  const marker = html.indexOf('data-e-id="zone_gallery"');
  const gallery = [];

  if (marker >= 0) {
    galleryPages += 1;
    const start = html.lastIndexOf('<div', marker);
    const end = html.indexOf('</section>', marker);
    if (start < 0 || end < 0) throw new Error(`Could not isolate completed-projects gallery for ${slug}`);

    const zone = html.slice(start, end);
    const seenSources = new Set();

    for (const match of zone.matchAll(/<img\b[^>]*>/gi)) {
      const tag = match[0];
      const source = tag.match(/\bdata-src=["']([^"']+)["']/i)?.[1] ?? tag.match(/\bsrc=["']([^"']+)["']/i)?.[1];
      if (!source || !/\.(?:jpe?g|png|webp|gif)(?:\?.*)?$/i.test(source)) continue;

      const sourceUrl = new URL(source, 'https://abatek.ru');
      if (sourceUrl.hostname !== 'abatek.ru' || !sourceUrl.pathname.startsWith('/img/')) continue;
      if (seenSources.has(sourceUrl.pathname)) continue;
      seenSources.add(sourceUrl.pathname);

      const sourceImage = path.join(sourceRoot, decodeURIComponent(sourceUrl.pathname).replace(/^\//, ''));
      if (!fs.existsSync(sourceImage)) throw new Error(`Gallery image was not found for ${slug}: ${sourceImage}`);

      const fileName = path.basename(sourceImage);
      const targetImage = path.join(imagesRoot, fileName);
      fs.copyFileSync(sourceImage, targetImage);
      copiedImages.add(fileName);

      const alt = decodeHtml(tag.match(/\balt=["']([^"']*)["']/i)?.[1] ?? `Выполненный проект: ${slug}`);
      gallery.push({ src: `/images/gallery/${fileName}`, alt });
    }
  }

  totalEntries += gallery.length;
  const rows = gallery.map(
    ({ src, alt }) => `  {\n    src: ${toTypeScriptString(src)},\n    alt: ${toTypeScriptString(alt)},\n  },`,
  );
  const output = rows.length
    ? `export const gallery = [\n${rows.join('\n')}\n] as const;\n`
    : 'export const gallery = [] as const;\n';
  fs.writeFileSync(targetFile, output, 'utf8');
}

console.log(
  `Generated ${slugs.length} gallery files: ${galleryPages} completed-project galleries, ` +
    `${totalEntries} entries, ${copiedImages.size} unique images.`,
);
