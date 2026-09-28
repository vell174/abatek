import type { PageSeo } from '../_shared/types';
import { catalog } from './data-catalog';
import { pageData } from './data';

const title = pageData.seoTitle;
const description =
  'Купить конвейер от производителя АБАТЭК: 6 видов оборудования. Подбор и производство промышленных конвейеров на заказ по техническому заданию.';

export const seo = {
  title,
  description,
  keywords: [
    'купить конвейер',
    'производство конвейеров',
    'производство промышленных конвейеров',
    'изготовитель конвейеров',
    'завод конвейерного оборудования',
    'виды конвейеров',
    'конвейер на заказ',
    'подбор конвейера',
    'конвейеры от производителя купить',
  ],
  canonicalPath: '/konveyery-po-vidam/',
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  image: { src: pageData.image, alt: pageData.imageAlt, width: 720, height: 480, type: 'image/webp' },
  openGraph: { title, description, type: 'website', locale: 'ru_RU', siteName: 'АБАТЭК' },
  twitter: { card: 'summary_large_image', title, description },
  breadcrumbs: [
    { name: 'Главная', path: '/' },
    { name: 'Каталог оборудования', path: '/#catalog' },
    { name: pageData.title, path: '/konveyery-po-vidam/' },
  ],
  schema: {
    pageType: 'CollectionPage',
    entityType: 'ItemList',
    itemType: 'WebPage',
    name: pageData.title,
    category: 'Конвейерное оборудование',
    items: catalog.map((item) => ({
      name: item.title,
      url: item.href,
      description: item.text.join(' '),
      image: item.image,
    })),
  },
} satisfies PageSeo;
