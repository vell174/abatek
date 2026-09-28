import type { PageSeo } from '../_shared/types';
import { pageData } from './data';
import { catalog } from './data-catalog';

export const seo: PageSeo = {
  title: pageData.seoTitle,
  description: pageData.description,
  keywords: [
    'винтовой конвейер купить',
    'шнековый конвейер купить',
    'шнековый транспортер купить',
    'винтовой транспортер',
    'шнековый транспортер цена',
    'шнековый транспортер для зерна',
    'шнековый транспортер для цемента',
    'шнековый транспортер для песка',
    'шнековый транспортер из нержавеющей стали',
    'износостойкие витки и желоб винтового конвейера',
    'шнековые конвейеры для сыпучих материалов',
    'конвейер винтовой КВ',
    'винтовой конвейер ВК',
    'транспортер шнековый ТШ',
    'конвейер БКВ',
  ],
  canonicalPath: '/vintovye-konvejery/',
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  image: {
    src: pageData.image,
    alt: pageData.imageAlt ?? pageData.title,
    width: 1600,
    height: 640,
    type: 'image/webp',
  },
  openGraph: {
    title: pageData.seoTitle,
    description: pageData.description,
    type: 'website',
    locale: 'ru_RU',
    siteName: 'АБАТЭК',
  },
  twitter: { card: 'summary_large_image', title: pageData.seoTitle, description: pageData.description },
  breadcrumbs: [
    { name: 'Главная', path: '/' },
    { name: pageData.title, path: '/vintovye-konvejery/' },
  ],
  schema: {
    pageType: 'CollectionPage',
    entityType: 'ItemList',
    name: pageData.galleryTitle,
    category: 'Винтовые конвейеры и питатели',
    items: catalog.map((product) => ({
      name: product.title,
      url: product.href,
      description: product.text?.join(' '),
      image: product.image,
    })),
  },
};
