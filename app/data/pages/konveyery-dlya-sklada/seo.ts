import type { PageSeo } from '../_shared/types';
import { pageData } from './data';

const title = 'Конвейеры для склада: ленточные и роликовые | АБАТЭК';
const description =
  'Ленточные конвейеры и приводные и неприводные рольганги для склада: применение в единой линии, сравнение, подбор по грузу и планировке.';

export const seo = {
  title,
  description,
  keywords: [
    'конвейеры для склада',
    'складские конвейеры',
    'ленточные и роликовые конвейеры для склада',
    'складской рольганг',
    'конвейерная линия склада',
  ],
  canonicalPath: '/konveyery-dlya-sklada/',
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  image: {
    src: pageData.heroImage,
    alt: pageData.heroImageAlt,
    type: 'image/webp',
    width: 1600,
    height: 900,
  },
  openGraph: { title, description, type: 'website', locale: 'ru_RU', siteName: 'АБАТЭК' },
  twitter: { card: 'summary_large_image', title, description },
  breadcrumbs: [
    { name: 'Главная', path: '/' },
    { name: 'Конвейеры и транспортеры', path: '/conveyors/' },
    { name: 'Конвейеры для склада', path: '/konveyery-dlya-sklada/' },
  ],
  schema: {
    pageType: 'CollectionPage',
    entityType: 'ProductGroup',
    name: 'Конвейеры для склада',
    category: 'Складские конвейеры',
  },
} satisfies PageSeo;
