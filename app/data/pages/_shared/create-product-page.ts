import type { IndustrialPage, PageSeo } from './types';

export interface ProductPageOptions {
  slug: string;
  title: string;
  description: string;
  image: string;
  imageAlt?: string;
  imageHeight?: IndustrialPage['imageHeight'];
  heroImage?: string;
  heroImageAlt?: string;
  heroBackgroundVariant?: IndustrialPage['heroBackgroundVariant'];
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
    imageAlt: options.imageAlt,
    imageHeight: options.imageHeight,
    heroImage: options.heroImage,
    heroBackgroundVariant: options.heroBackgroundVariant,
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
    image: {
      src: options.heroImage ?? options.image,
      alt: options.heroImageAlt ?? options.title,
      type: (options.heroImage ?? options.image).endsWith('.webp') ? 'image/webp' : 'image/jpeg',
    },
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
