import { createProductSeo } from '../_shared/create-product-page';
import { pageData, pageOptions } from './data';
import type { PageSeo } from '../_shared/types';

const base = createProductSeo(pageOptions);

export const seo: PageSeo = {
  ...base,
  title: pageData.seoTitle,
  image: { src: pageData.image, alt: pageData.imageAlt ?? pageData.title, width: 720, height: 480, type: 'image/webp' },
  openGraph: { ...base.openGraph, title: pageData.seoTitle },
  twitter: { ...base.twitter, title: pageData.seoTitle },
  breadcrumbs: [
    { name: 'Главная', path: '/' },
    { name: 'Конвейеры и транспортеры по видам', path: '/konveyery-po-vidam/' },
    { name: pageData.title, path: '/lentochnye-pitateli/' },
  ],
  schema: { ...base.schema, pageType: 'WebPage' },
};
