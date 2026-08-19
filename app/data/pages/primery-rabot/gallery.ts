import { gallery as beltConveyors } from '../lentochnye-konvejery/gallery';
import { gallery as foodLines } from '../konvejery-dlya-konfet/gallery';
import { gallery as industryLines } from '../konvejery-dlya-uglya/gallery';
import { gallery as rollerConveyors } from '../rolgang/gallery';
import { gallery as tanks } from '../rezervuary/gallery';
import { gallery as components } from '../barabany/gallery';
import type { GalleryImage } from '../_shared/types';

export interface ProjectGalleryCategory {
  id: string;
  label: string;
  shortLabel: string;
  description: string;
  images: readonly GalleryImage[];
}

export const galleryCategories = [
  {
    id: 'belt-conveyors',
    label: 'Ленточные конвейеры',
    shortLabel: 'Ленточные',
    description: 'Прямые, наклонные и специальные транспортирующие линии.',
    images: beltConveyors,
  },
  {
    id: 'food-lines',
    label: 'Пищевые линии',
    shortLabel: 'Пищевые',
    description: 'Оборудование для бережного перемещения пищевой продукции.',
    images: foodLines,
  },
  {
    id: 'industry-lines',
    label: 'Отраслевые решения',
    shortLabel: 'Отраслевые',
    description: 'Конвейеры для сложных грузов и производственных условий.',
    images: industryLines,
  },
  {
    id: 'roller-conveyors',
    label: 'Роликовые конвейеры',
    shortLabel: 'Роликовые',
    description: 'Приводные и гравитационные рольганги для штучных грузов.',
    images: rollerConveyors,
  },
  {
    id: 'tanks',
    label: 'Резервуары',
    shortLabel: 'Резервуары',
    description: 'Горизонтальные стальные ёмкости промышленного назначения.',
    images: tanks,
  },
  {
    id: 'components',
    label: 'Комплектующие',
    shortLabel: 'Комплектующие',
    description: 'Барабаны, ролики и роликоопоры собственного производства.',
    images: components,
  },
] as const satisfies readonly ProjectGalleryCategory[];

export const gallery = galleryCategories.flatMap((category) =>
  category.images.map((image) => ({ ...image, categoryId: category.id })),
);
