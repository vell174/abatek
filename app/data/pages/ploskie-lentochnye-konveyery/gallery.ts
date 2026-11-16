import type { GalleryImage } from '../_shared/types';
import { gallery as inclinedGallery } from '../naklonnyj-lentochnyj-konvejer/gallery';
import { gallery as miniGallery } from '../mini-lentochnyy-konveyer/gallery';

const archivePhotos = [
  {
    src: '/images/belt-projects/flat/konveyer-dlya-marikrovki-produktsii.webp',
    fullSrc: '/images/belt-projects/flat/konveyer-dlya-marikrovki-produktsii-full.webp',
    alt: 'конвейер для марикровки продукции',
    width: 800,
    height: 480,
    fullWidth: 1280,
    fullHeight: 768,
  },
  {
    src: '/images/belt-projects/flat/konveyer-pryamoy-iz-nerzhaveyushchey-stali-s-pvh-lentoy.webp',
    fullSrc: '/images/belt-projects/flat/konveyer-pryamoy-iz-nerzhaveyushchey-stali-s-pvh-lentoy-full.webp',
    alt: 'Конвейер прямой из нержавеющей стали с ПВХ лентой',
    width: 800,
    height: 480,
    fullWidth: 1280,
    fullHeight: 768,
  },
  {
    src: '/images/belt-projects/flat/konveyer-s-ploskoy-lentoy-i-prodolnymi-bortami-dlya-ovoshchey-clean.webp',
    fullSrc: '/images/belt-projects/flat/konveyer-s-ploskoy-lentoy-i-prodolnymi-bortami-dlya-ovoshchey-clean-full.webp',
    alt: 'Конвейер с плоской лентой и продольными бортами для овощей',
    width: 800,
    height: 600,
    fullWidth: 1448,
    fullHeight: 1086,
  },
  {
    src: '/images/belt-projects/flat/konveyer-s-ploskoy-rabochey-vetvyu-dlya-paketov-s-mukoy.webp',
    fullSrc: '/images/belt-projects/flat/konveyer-s-ploskoy-rabochey-vetvyu-dlya-paketov-s-mukoy-full.webp',
    alt: 'Конвейер с плоской рабочей ветвью для пакетов с мукой',
    width: 800,
    height: 633,
    fullWidth: 887,
    fullHeight: 702,
  },
  {
    src: '/images/belt-projects/flat/peredvizhnoy-konveyer-s-pryamoy-pvh-lentoy.webp',
    fullSrc: '/images/belt-projects/flat/peredvizhnoy-konveyer-s-pryamoy-pvh-lentoy-full.webp',
    alt: 'Передвижной конвейер с прямой ПВХ лентой',
    width: 800,
    height: 565,
    fullWidth: 1151,
    fullHeight: 813,
  },
  {
    src: '/images/belt-projects/flat/pishchevoy-pryamoy-konveyer-s-pvh-lentoy.webp',
    fullSrc: '/images/belt-projects/flat/pishchevoy-pryamoy-konveyer-s-pvh-lentoy-full.webp',
    alt: 'Пищевой прямой конвейер с ПВХ лентой',
    width: 800,
    height: 480,
    fullWidth: 1280,
    fullHeight: 768,
  },
  {
    src: '/images/belt-projects/flat/pryamoy-konveyer-dlya-tsvetov-clean.webp',
    fullSrc: '/images/belt-projects/flat/pryamoy-konveyer-dlya-tsvetov-clean-full.webp',
    alt: 'Прямой конвейер для цветов',
    width: 800,
    height: 600,
    fullWidth: 1448,
    fullHeight: 1086,
  },
  {
    src: '/images/belt-projects/flat/pryamoy-konveyr-dlya-linii-sortirovki-stekla.webp',
    alt: 'Прямой конвейр для линии сортировки стекла',
    width: 578,
    height: 434,
  },
  {
    src: '/images/belt-projects/flat/transporter-dlya-shtuchnyh-gruzov.webp',
    fullSrc: '/images/belt-projects/flat/transporter-dlya-shtuchnyh-gruzov-full.webp',
    alt: 'Транспортер для штучных грузов',
    width: 800,
    height: 1067,
    fullWidth: 1600,
    fullHeight: 2133,
    imageFit: 'contain',
  },
] as const satisfies readonly GalleryImage[];

export const gallery = [
  ...inclinedGallery.slice(6, 10),
  ...miniGallery.slice(0, 4),
  ...archivePhotos,
] satisfies readonly GalleryImage[];
