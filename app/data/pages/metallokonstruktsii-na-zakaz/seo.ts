import type { PageSeo } from '../_shared/types';
import { pageData } from './data';

export const seo = {
  title: pageData.seoTitle,
  description: pageData.description,
  keywords: [
    'завод нестандартных металлоизделий',
    'завод нестандартных металлоизделий челябинск',
    'изготовление изделий из металла по чертежам заказчика',
    'изготовление металлоизделий по чертежам',
    'изделие из металла по чертежу',
    'изделия из металла по чертежам заказчика',
    'металлические изделия по чертежам',
    'металлоизделия на заказ',
    'металлоизделия по чертежам заказчика',
    'изготовление металлоизделий на заказ',
    'сварные изделия по чертежам',
    'нестандартные металлоизделия',
  ],
  canonicalPath: '/metalloizdeliya-po-chertezham/',
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  image: { src: pageData.image, alt: pageData.imageAlt, width: 1440, height: 1081, type: 'image/webp' },
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
    { name: pageData.title, path: '/metalloizdeliya-po-chertezham/' },
  ],
  schema: { pageType: 'WebPage', name: pageData.title },
} satisfies PageSeo;
