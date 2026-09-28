import fs from 'node:fs/promises';
import sharp from 'sharp';

const source = JSON.parse(
  (await fs.readFile('research/metal-projects-source/manifest.json', 'utf8')).replace(/^\uFEFF/, ''),
);
const names = [
  ['bunker-dlya-zerna-po-razmeram-zakazchika', 'Бункер для зерна по размерам заказчика'],
  ['valki-roliki-po-chertezham-zakazchika', 'Валки (ролики) по чертежам заказчика'],
  ['gruppovoy-tsiklon-aspiratsii-po-chertezham', 'Групповой циклон аспирации по чертежам заказчика'],
  ['smesiteli-po-chertezham-zakazchika', 'Смесители по чертежам заказчика'],
  [
    'kovshi-elevatora-ts-500-nerzhaveyushchaya-stal',
    'Ковши элеватора ЦС-500 из нержавеющей стали по чертежам заказчика',
  ],
  ['kolodets-tekhnologicheskiy-po-razmeram', 'Технологический колодец по размерам заказчика'],
  ['karkasy-kabin-po-chertezham-zakazchika', 'Металлические каркасы кабин по чертежам заказчика'],
  ['svarnoy-korpus-po-chertezham-zakazchika', 'Сварной корпус с рёбрами жёсткости по чертежам заказчика'],
  ['metalloizdelie-po-chertezham-zakazchika', 'Металлоизделие по чертежам заказчика'],
  ['nestandartnyy-sborochnyy-uzel-po-chertezham', 'Нестандартный сборочный узел по чертежам заказчика'],
  ['ploshchadka-obsluzhivaniya-rezervuara', 'Площадка обслуживания резервуара'],
  ['rezervuar-vertikalnyy-ochistka-vody-3d-model', '3D-модель вертикального резервуара для системы очистки воды'],
  ['silos-s-zontom-dlya-ochistki-vody', 'Силос с зонтом для системы очистки воды по чертежам заказчика'],
  ['skat-dlya-introskopa-po-razmeram', 'Скат для интроскопа по индивидуальным размерам'],
  ['smesitel-alyuminievyh-suspenziy-po-chertezham', 'Смеситель алюминиевых суспензий по чертежам заказчика'],
  ['tsiklony-tsn-15-proizvodstvo', 'Циклоны ЦН-15'],
  ['shnek-nestandartnyy-po-chertezham', 'Нестандартный шнек по чертежам заказчика'],
];
const directory = 'public/images/metalloizdeliya-po-chertezham';
await fs.mkdir(directory, { recursive: true });
const results = [];
for (const item of source) {
  const [slug, alt] = names[item.index - 1];
  const filename = `${slug}-abatek`;
  const full = await sharp(item.file)
    .rotate()
    .resize({ width: 1440, height: 1440, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 80, effort: 6 })
    .toFile(`${directory}/${filename}.webp`);
  const preview = await sharp(item.file)
    .rotate()
    .resize({ width: 640, height: 640, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 76, effort: 6 })
    .toFile(`${directory}/${filename}-640.webp`);
  results.push({
    index: item.index,
    originalName: item.name,
    originalBytes: item.bytes,
    src: `/images/metalloizdeliya-po-chertezham/${filename}-640.webp`,
    fullSrc: `/images/metalloizdeliya-po-chertezham/${filename}.webp`,
    alt,
    width: preview.width,
    height: preview.height,
    fullWidth: full.width,
    fullHeight: full.height,
    previewBytes: preview.size,
    fullBytes: full.size,
  });
}
await fs.writeFile('research/metal-projects-optimized.json', JSON.stringify(results, null, 2));
const gallery = results
  .filter((item) => item.index !== 12)
  .map(({ src, fullSrc, alt, width, height, fullWidth, fullHeight }) => ({
    src,
    fullSrc,
    alt,
    width,
    height,
    fullWidth,
    fullHeight,
    imageFit: 'contain',
  }));
await fs.writeFile(
  'app/data/pages/metallokonstruktsii-na-zakaz/gallery.ts',
  `import type { GalleryImage } from '../_shared/types';\n\nexport const gallery = ${JSON.stringify(gallery, null, 2)} satisfies GalleryImage[];\n`,
);
console.log(
  JSON.stringify(
    {
      count: results.length,
      originalMB: results.reduce((s, x) => s + x.originalBytes, 0) / 1e6,
      previewsKB: results.reduce((s, x) => s + x.previewBytes, 0) / 1e3,
      fullKB: results.reduce((s, x) => s + x.fullBytes, 0) / 1e3,
      maxPreviewKB: Math.max(...results.map((x) => x.previewBytes)) / 1e3,
    },
    null,
    2,
  ),
);
