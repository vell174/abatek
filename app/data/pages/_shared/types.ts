export interface IndustrialSection {
  title: string;
  text?: string[];
  items?: string[];
  image?: string;
  imageAlt?: string;
  href?: string;
}

export interface GalleryImage {
  src: string;
  alt: string;
}

export interface IndustrialPage {
  title: string;
  seoTitle: string;
  description: string;
  image: string;
  introTitle: string;
  intro: string[];
  facts: Array<[string, string]>;
  sections: IndustrialSection[];
  table?: {
    title: string;
    headers: string[];
    rows: string[][];
  };
  video?: { title: string; embedUrl: string };
  theme: 'forest' | 'copper' | 'blue' | 'graphite' | 'wine' | 'teal' | 'indigo' | 'steel' | 'amber';
  galleryTitle: string;
}

export interface PageSeo {
  title: string;
  description: string;
  keywords: string[];
  canonicalPath: string;
  robots: string;
  image?: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    type?: 'image/jpeg' | 'image/gif' | 'image/png' | 'image/webp' | 'image/avif';
  };
  openGraph: {
    title: string;
    description: string;
    type: 'website';
    locale: 'ru_RU';
    siteName: 'АБАТЭК';
  };
  twitter: {
    card: 'summary_large_image';
    title: string;
    description: string;
  };
  breadcrumbs: Array<{ name: string; path: string }>;
  schema: {
    pageType: 'WebPage' | 'CollectionPage' | 'ContactPage' | 'AboutPage';
    entityType?: 'Product' | 'ItemList' | 'Organization' | 'WebSite';
    name: string;
    category?: string;
    items?: Array<{ name: string; description?: string; image?: string }>;
    properties?: Array<{ name: string; value: string }>;
  };
}

export interface PageRoutes {
  root: string;
  slugs: string[];
}
