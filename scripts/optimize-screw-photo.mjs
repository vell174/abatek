import fs from 'node:fs/promises';
import sharp from 'sharp';

const source = process.argv[2];
if (!source) throw new Error('Укажите путь к фотографии винтового конвейера.');

const original = await fs.readFile(source);
for (const [suffix, width, quality] of [
  ['', 1600, 82],
  ['-card', 720, 80],
]) {
  const target = `public/images/vintovoy-konveyer-dlya-tsementa-abatek${suffix}.webp`;
  const { data, info } = await sharp(original)
    .rotate()
    .resize({ width, withoutEnlargement: true })
    .webp({ quality, effort: 6 })
    .toBuffer({ resolveWithObject: true });
  await fs.writeFile(target, data);
  console.log(`${target}: ${info.width} × ${info.height}, ${data.length} байт (исходник: ${original.length})`);
}
