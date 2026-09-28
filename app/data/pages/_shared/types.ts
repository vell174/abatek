export interface IndustrialSection {
  id?: string;
  title: string;
  shortTitle?: string;
  text?: string[];
  items?: string[];
  image?: string;
  imageAlt?: string;
  cardImage?: GalleryImage;
  imageFit?: 'cover' | 'contain';
  href?: string;
}

export interface GalleryImage {
  src: string;
  alt: string;
  fullSrc?: string;
  width?: number;
  height?: number;
  fullWidth?: number;
  fullHeight?: number;
  imageFit?: 'cover' | 'contain';
}

export interface IndustrialPage {
  title: string;
  seoTitle: string;
  description: string;
  heroAccents?: readonly string[];
  heroImage?: string;
  heroTitleVariant?: 'default' | 'wide-light';
  image: string;
  imageAlt?: string;
  imageFit?: 'cover' | 'contain';
  imageScale?: 'default' | '120';
  imageCaption?: string;
  imageHeight?: 'default' | 'tall';
  introTitle: string;
  introVariant?: 'default' | 'text-only';
  intro: string[];
  facts: Array<[string, string]>;
  sections: IndustrialSection[];
  sectionsCollapsible?: boolean;
  sectionsTitle?: string;
  table?: {
    title: string;
    headers: string[];
    rows: string[][];
  };
  tables?: Array<{
    title: string;
    eyebrow?: string;
    headers: string[];
    rows: string[][];
  }>;
  video?: { title: string; embedUrl: string };
  theme: 'forest' | 'copper' | 'blue' | 'graphite' | 'wine' | 'teal' | 'indigo' | 'steel' | 'amber';
  galleryTitle: string;
  projectsTitle?: string;
  projectsPlacement?: 'before-content' | 'before-workflow';
  hideCatalog?: boolean;
  catalogVariant?: 'default' | 'categories';
  classificationGroups?: Array<{ title: string; description: string; items: IndustrialSection[] }>;
  sectionLinks?: Array<{ id: string; label: string }>;
  parentBreadcrumb?: { label: string; to: string };
  workflow?: {
    eyebrow: string;
    title: string;
    note: string;
    items: string[];
  };
  faq?: Array<{ question: string; answer: string }>;
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
    entityType?: 'Product' | 'ProductGroup' | 'ItemList' | 'Organization' | 'WebSite';
    itemType?: 'Product' | 'WebPage';
    name: string;
    category?: string;
    productGroupId?: string;
    variesBy?: string[];
    items?: Array<{
      name: string;
      url?: string;
      sku?: string;
      description?: string;
      image?: string;
      properties?: Array<{ name: string; value: string }>;
    }>;
    properties?: Array<{ name: string; value: string }>;
  };
}

export interface PageRoutes {
  root: string;
  slugs: string[];
}
