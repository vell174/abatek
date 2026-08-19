// Пересжатие изображений в public/images: ограничение ширины и повторное
// кодирование в webp. Запуск: npm run images:optimize
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = 'public/images';
const MAX_WIDTH = 1600;
const QUALITY = 82;

// Облегчённые варианты LCP-изображений для мобильных: <исходник>: [ширина, качество]
const RESPONSIVE = {
  'home-hero-welding-2026.webp': [1000, 78],
  'contact-detail-premium.webp': [1000, 78],
};

function collect(dir) {
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...collect(full));
    else if (/\.(webp|jpe?g|png)$/i.test(entry.name) && !entry.name.endsWith('-mobile.webp')) files.push(full);
  }
  return files;
}

const files = collect(ROOT);
let before = 0;
let after = 0;
let changed = 0;

for (const file of files) {
  const source = fs.readFileSync(file);
  const image = sharp(source);
  const meta = await image.metadata();
  const pipeline = meta.width > MAX_WIDTH ? image.resize({ width: MAX_WIDTH, withoutEnlargement: true }) : image;
  const output = await pipeline.webp({ quality: QUALITY, effort: 6 }).toBuffer();

  before += source.length;
  // Порог в 10% защищает от повторного пересжатия уже оптимизированных файлов.
  if (output.length < source.length * 0.9) {
    fs.writeFileSync(file, output);
    after += output.length;
    changed += 1;
    const saved = ((1 - output.length / source.length) * 100).toFixed(0);
    console.log(`${file}: ${(source.length / 1024).toFixed(0)} → ${(output.length / 1024).toFixed(0)} КБ (-${saved}%)`);
  } else {
    after += source.length;
  }
}

const savedPercent = (((before - after) / before) * 100).toFixed(1);
console.log(
  `\nОбработано ${files.length}, пересжато ${changed}. ` +
    `${(before / 1048576).toFixed(1)} МБ → ${(after / 1048576).toFixed(1)} МБ (-${savedPercent}%)`,
);

for (const [name, [width, quality]] of Object.entries(RESPONSIVE)) {
  const source = path.join(ROOT, name);
  const target = source.replace(/\.webp$/, '-mobile.webp');
  const buffer = await sharp(fs.readFileSync(source))
    .resize({ width, withoutEnlargement: true })
    .webp({ quality, effort: 6 })
    .toBuffer();
  fs.writeFileSync(target, buffer);
  console.log(`мобильный вариант ${target}: ${(buffer.length / 1024).toFixed(0)} КБ`);
}
