import { catalogGroups } from '~/data/navigation/catalog';
import type { GalleryImage, IndustrialPage } from '../_shared/types';

interface GalleryModule {
  gallery: readonly GalleryImage[];
}
interface PageModule {
  pageData: IndustrialPage;
}

const galleryModules = import.meta.glob<GalleryModule>(['../*/gallery.ts', '!../primery-rabot/gallery.ts'], {
  eager: true,
});
const pageModules = import.meta.glob<PageModule>('../*/data.ts', { eager: true });

export interface PhotoCategory {
  id: string;
  label: string;
  description: string;
  images: GalleryImage[];
}

export interface PhotoGroup {
  title: string;
  categories: PhotoCategory[];
}

const definitions = [
  {
    id: 'belt',
    label: 'Ленточные конвейеры',
    description: 'Ленточные конвейеры для разных грузов и условий эксплуатации.',
    group: 0,
  },
  {
    id: 'screw',
    label: 'Винтовые конвейеры',
    description: 'Винтовые транспортёры и питатели для сыпучих материалов.',
    group: 0,
  },
  { id: 'roller', label: 'Рольганги', description: 'Приводные и неприводные роликовые конвейеры.', group: 0 },
  {
    id: 'chain',
    label: 'Цепные конвейеры',
    description: 'Цепные, скребковые и пластинчатые транспортёры, в том числе для дров.',
    group: 0,
  },
  { id: 'elevator', label: 'Ковшовые элеваторы', description: 'Изготовленные ковшовые элеваторы и их узлы.', group: 0 },
  { id: 'drums', label: 'Барабаны конвейерные', description: 'Приводные, натяжные и специальные барабаны.', group: 2 },
  { id: 'augers', label: 'Шнеки', description: 'Изготовленные шнеки для винтовых конвейеров.', group: 2 },
  {
    id: 'buckets',
    label: 'Ковши элеватора',
    description: 'Изготовленные металлические ковши для ковшовых элеваторов.',
    group: 2,
  },
  { id: 'parts', label: 'Другие комплектующие', description: 'Ролики, роликоопоры и другие узлы.', group: 2 },
  {
    id: 'storage',
    label: 'Ёмкостное оборудование',
    description: 'Резервуары, бункеры и другое ёмкостное оборудование.',
    group: 3,
  },
  { id: 'cyclones', label: 'Циклоны и аспирация', description: 'Оборудование для систем аспирации.', group: 4 },
  {
    id: 'valves',
    label: 'Шлюзовые затворы и питатели',
    description: 'Шлюзовое оборудование для сыпучих материалов.',
    group: 5,
  },
  { id: 'metal', label: 'Металлоизделия', description: 'Металлоконструкции по чертежам заказчика.', group: 6 },
] as const;

function categoryFor(root: string): (typeof definitions)[number]['id'] {
  if (/baraban|barabany/.test(root)) return 'drums';
  if (/rezervuar|^rgs-|bunkery|silosy/.test(root)) return 'storage';
  if (/^ciklony/.test(root)) return 'cyclones';
  if (/shlyuzov/.test(root)) return 'valves';
  if (/metallokonstruktsii/.test(root)) return 'metal';
  if (/^elevatory/.test(root)) return 'elevator';
  if (/^kovshi/.test(root)) return 'buckets';
  if (/^roliki|^rolikoopory|^dempfernye/.test(root)) return 'parts';
  if (/^shneki/.test(root)) return 'augers';
  if (/^vintovoy|^vintovye|^konvejery-dlya-(peska|zerna)$/.test(root)) return 'screw';
  if (/rolgang|rolikovye|gravitatcionnyj|sharikovye-stoly/.test(root)) return 'roller';
  if (/^cepnye|skrebkovye|plastinchatye|^transporterdlyadrov$/.test(root)) return 'chain';
  return 'belt';
}

const categories: PhotoCategory[] = definitions.map(({ id, label, description }) => ({
  id,
  label,
  description,
  images: [],
}));
const categoryById = new Map(categories.map((category) => [category.id, category]));
const seen = new Set<string>();
const excludedImages = new Set([
  '/images/gallery/26553117.webp',
  '/images/gallery/26553105.webp',
  '/images/gallery/50735867.webp',
  '/images/gallery/50735895.webp',
  '/images/belt-projects/inclined/naklonnyy-konveyer-s-pvh-lentoy-dlya-shtuchnyh-gruzov.webp',
  '/images/gallery/26760068.webp',
  '/images/belt-projects/zhelobchatyy-konveyer-otsev-shchebnya.webp',
  '/images/belt-projects/zhelobchatyy-konveyer-gladkaya-lenta.webp',
  '/images/belt-projects/sidewall/gofroborta-lenta-i-peregorodki.webp',
  '/images/belt-projects/partitioned/naklonnyy-konveyer-dlya-shtuchnyh-gruzov.jpg',
  '/images/mini-conveyor-projects/mini-conveyor-blue-frame-full.webp',
]);

for (const [path, module] of Object.entries(galleryModules).sort(([a], [b]) => a.localeCompare(b))) {
  const root = path.split('/')[1];
  if (root === 'primery-rabot' || root === 'silosy') continue;
  const page = pageModules[`../${root}/data.ts`]?.pageData;
  if (!page || page.hideProjects) continue;

  const category = categoryById.get(categoryFor(root));
  if (!category) continue;
  for (const image of module.gallery) {
    if (excludedImages.has(image.src) || (image.fullSrc && excludedImages.has(image.fullSrc))) continue;
    if (seen.has(image.src) || (image.fullSrc && seen.has(image.fullSrc))) continue;
    seen.add(image.src);
    if (image.fullSrc) seen.add(image.fullSrc);
    category.images.push(image);
  }
}

export const galleryCategories = categories.filter((category) => category.images.length > 0);
export const galleryGroups: PhotoGroup[] = catalogGroups
  .map((group, index) => ({
    title: group.title,
    categories: galleryCategories.filter(
      (category) => definitions.find((item) => item.id === category.id)?.group === index,
    ),
  }))
  .filter((group) => group.categories.length > 0);

export const gallery = galleryCategories.flatMap((category) =>
  category.images.map((image) => ({ ...image, categoryId: category.id })),
);
