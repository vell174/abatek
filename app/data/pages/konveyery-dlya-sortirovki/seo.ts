import type { PageSeo } from '../_shared/types';
import { pageData } from './data';

const title = 'Конвейеры для сортировки грузов и отходов | АБАТЭК';
const description =
  'Сортировочные конвейеры для складов, логистики, производства и переработки отходов. Сравнение ленточных, роликовых и других секций, подбор линии по грузу.';

export const seo = {
  title,
  description,
  keywords: [
    'конвейеры для сортировки',
    'сортировочный конвейер',
    'сортировочная конвейерная линия',
    'конвейер для сортировки посылок',
    'конвейер для сортировки отходов',
    'роликовый конвейер для сортировки коробок',
  ],
  canonicalPath: '/konveyery-dlya-sortirovki/',
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  image: {
    src: pageData.heroImage,
    alt: pageData.heroImageAlt,
    type: 'image/webp',
    width: 1672,
    height: 941,
  },
  openGraph: { title, description, type: 'website', locale: 'ru_RU', siteName: 'АБАТЭК' },
  twitter: { card: 'summary_large_image', title, description },
  breadcrumbs: [
    { name: 'Главная', path: '/' },
    { name: 'Конвейеры и транспортеры', path: '/conveyors/' },
    { name: 'Конвейеры для сортировки', path: '/konveyery-dlya-sortirovki/' },
  ],
  schema: {
    pageType: 'CollectionPage',
    entityType: 'ProductGroup',
    name: 'Конвейеры для сортировки',
    category: 'Сортировочные конвейеры',
  },
} satisfies PageSeo;
