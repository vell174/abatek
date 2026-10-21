import type { PageSeo } from '../_shared/types';
import { catalog } from './data-catalog';
import { pageData } from './data';

const title = 'Стальные цельносварные силосы для цемента | АБАТЭК';
const description =
  'Стальные силосы для цемента и сыпучих материалов: цельносварные до 48 и 50–100 м³, мобильный 22 м³, нержавеющие под заказ. Изготовление по ТЗ.';

export const seo = {
  title,
  description,
  keywords: [
    'стальной силос',
    'силос для цемента',
    'силос под цемент',
    'силосы для хранения цемента',
    'мобильный силос',
    'цельносварной силос',
    'силос из нержавеющей стали',
  ],
  canonicalPath: '/silosy/',
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  image: {
    src: pageData.heroImage,
    alt: pageData.heroImageAlt,
    type: 'image/webp',
    width: 1276,
    height: 777,
  },
  openGraph: {
    title,
    description,
    type: 'website',
    locale: 'ru_RU',
    siteName: 'АБАТЭК',
  },
  twitter: { card: 'summary_large_image', title, description },
  breadcrumbs: [
    { name: 'Главная', path: '/' },
    { name: 'Стальные цельносварные силосы', path: '/silosy/' },
  ],
  schema: {
    pageType: 'WebPage',
    entityType: 'ItemList',
    itemType: 'Product',
    name: 'Цельносварные силосы АБАТЭК',
    category: 'Силосы для сыпучих материалов',
    items: catalog.map((item) => ({ name: item.title, description: item.text?.[0] })),
  },
} satisfies PageSeo;
