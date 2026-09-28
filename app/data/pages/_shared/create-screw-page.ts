import { createProductPage, createProductSeo } from './create-product-page';
import type { ProductPageOptions } from './create-product-page';
import { createIndustrialFaq } from './faq';
import type { IndustrialPage, PageSeo } from './types';

export function createScrewPage(
  options: ProductPageOptions & { imageAlt: string; faq: IndustrialPage['faq'] },
): IndustrialPage {
  return {
    ...createProductPage(options),
    seoTitle: `${options.title} — купить, расчёт цены | АБАТЭК`,
    theme: 'blue',
    heroImage: '/images/vintovoy-konveyer-dlya-tsementa-abatek.webp',
    imageAlt: options.imageAlt,
    imageFit: 'contain',
    hideCatalog: true,
    parentBreadcrumb: { label: 'Винтовые конвейеры', to: '/vintovye-konvejery/' },
    faq: [
      ...(options.faq ?? []),
      ...createIndustrialFaq(
        'Нужны свойства материала, подача в т/ч или м³/ч, длина, высота подъёма, схема загрузки и выгрузки, параметры бункера и режим работы.',
      ),
    ],
  };
}

export function createScrewSeo(options: ProductPageOptions, page: IndustrialPage): PageSeo {
  const base = createProductSeo(options);
  return {
    ...base,
    title: page.seoTitle,
    image: { src: page.image, alt: page.imageAlt ?? page.title, type: 'image/webp' },
    openGraph: { ...base.openGraph, title: page.seoTitle },
    twitter: { ...base.twitter, title: page.seoTitle },
    breadcrumbs: [
      { name: 'Главная', path: '/' },
      { name: 'Винтовые конвейеры', path: '/vintovye-konvejery/' },
      { name: page.title, path: base.canonicalPath },
    ],
    schema: { ...base.schema, pageType: 'WebPage' },
  };
}
