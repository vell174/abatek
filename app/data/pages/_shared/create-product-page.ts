import type { IndustrialPage, PageSeo } from './types';

export interface ProductPageOptions {
  slug: string;
  title: string;
  description: string;
  image: string;
  intro: string[];
  facts: Array<[string, string]>;
  sections: IndustrialPage['sections'];
  table?: IndustrialPage['table'];
  keywords: string[];
  category?: string;
}

export function createProductPage(options: ProductPageOptions): IndustrialPage {
  return {
    theme: 'teal',
    galleryTitle: options.title,
    title: options.title,
    seoTitle: `${options.title} от производителя`,
    description: options.description,
    image: options.image,
    introTitle: options.title,
    intro: options.intro,
    facts: options.facts,
    sections: options.sections,
    table: options.table,
  };
}

export function createProductSeo(options: ProductPageOptions): PageSeo {
  return {
    title: `${options.title} | АБАТЭК`,
    description: options.description,
    keywords: options.keywords,
    canonicalPath: `/${options.slug}/`,
    robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    image: { src: options.image, alt: options.title, type: 'image/jpeg' },
    openGraph: {
      title: `${options.title} | АБАТЭК`,
      description: options.description,
      type: 'website',
      locale: 'ru_RU',
      siteName: 'АБАТЭК',
    },
    twitter: { card: 'summary_large_image', title: `${options.title} | АБАТЭК`, description: options.description },
    breadcrumbs: [
      { name: 'Главная', path: '/' },
      { name: options.category ?? 'Конвейеры', path: options.category ? '/rezervuary/' : '/conveyors/' },
      { name: options.title, path: `/${options.slug}/` },
    ],
    schema: {
      pageType: 'CollectionPage',
      entityType: 'Product',
      name: options.title,
      category: options.category ?? 'Конвейерное оборудование',
    },
  };
}
