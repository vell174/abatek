export interface IndustrialSection {
  id?: string;
  title: string;
  shortTitle?: string;
  text?: string[];
  items?: string[];
  image?: string;
  imageAlt?: string;
  cardImage?: GalleryImage;
  illustrations?: Array<GalleryImage & { caption: string; compact?: boolean }>;
  table?: {
    title: string;
    headers: string[];
    rows?: string[][];
    groupHeaders?: Array<{ label: string; colspan?: number; rowspan?: number }>;
    groups?: Array<{ label: string; description: string; image: GalleryImage; rows: string[][] }>;
  };
  specificationDocument?: string;
  specificationVisible?: boolean;
  specificationSource?: string;
  specificationSourceUrl?: string;
  imageFit?: 'cover' | 'contain';
  href?: string;
  features?: Array<{ title: string; text: string }>;
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
  heroImageAlt?: string;
  heroImagePosition?: string;
  heroActionLabel?: string;
  heroRequestContext?: string;
  heroBackgroundVariant?:
    | 'default'
    | 'drawing'
    | 'scraper-drawing'
    | 'elevator-drawing'
    | 'photo'
    | 'feeder-photo'
    | 'photo-clear'
    | 'product'
    | 'product-dark'
    | 'product-dark-contained'
    | 'rgs-photo'
    | 'rvs-photo'
    | 'screw-flight-photo'
    | 'flat-conveyor-photo'
    | 'smooth-belt-photo'
    | 'partitioned-conveyor-photo'
    | 'straight-conveyor-photo'
    | 'firewood-photo';
  heroCompact?: boolean;
  compactLayout?: boolean;
  heroTitleVariant?: 'default' | 'wide-light';
  image: string;
  imageAlt?: string;
  imageWidthPx?: number;
  imageHeightPx?: number;
  imageFit?: 'cover' | 'contain';
  imageFrame?: 'default' | 'bare';
  imageScale?: 'default' | '120';
  imageCaption?: string;
  imageHeight?: 'default' | 'compact' | 'tall';
  imageTone?: 'default' | 'dark';
  introTitle: string;
  introTitleSize?: 'default' | 'compact';
  introVariant?: 'default' | 'text-only';
  intro: string[];
  introLeadCompact?: boolean;
  facts: Array<[string, string]>;
  visualGuides?: Array<{
    id: string;
    eyebrow: string;
    title: string;
    description?: string;
    layout: 'cards' | 'feature';
    items: Array<{ title: string; description: string; image: GalleryImage }>;
  }>;
  sections: IndustrialSection[];
  sectionsCollapsible?: boolean;
  editorialAccordion?: boolean;
  sectionsTitle?: string;
  sectionsVariant?: 'default' | 'technical';
  hideProjects?: boolean;
  catalogCardVariant?: 'category' | 'showcase';
  catalogDescription?: string;
  hideContentBeforeWorkflow?: boolean;
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
  referenceCard?: {
    compact?: boolean;
    title: string;
    description: string;
    actionLabel: string;
    documentUrl: string;
  };
  introDownload?: {
    label: string;
    url: string;
  };
  video?:
    | { title: string; embedUrl: string; clips?: never }
    | { title: string; clips: Array<{ title: string; src: string; poster: string }>; embedUrl?: never };
  theme: 'forest' | 'copper' | 'blue' | 'graphite' | 'wine' | 'teal' | 'indigo' | 'steel' | 'amber';
  galleryTitle: string;
  projectsTitle?: string;
  projectsPlacement?: 'before-content' | 'before-workflow';
  contentOrder?: 'projects-first' | 'editorial-first' | 'catalog-first';
  projectsThenDetails?: boolean;
  hideCatalog?: boolean;
  hideCatalogImages?: boolean;
  catalogVariant?: 'default' | 'categories';
  classificationTitle?: string;
  classificationGroups?: Array<{ title: string; description: string; items: IndustrialSection[] }>;
  beltElevatorDetails?: Array<{
    image: GalleryImage;
    sketch: { src: string; alt: string; viewBox: string; width: number; height: number };
  }>;
  chainElevatorDetails?: Array<{
    image?: GalleryImage;
    imageCaption?: string;
    secondImage?: GalleryImage;
    secondImageCaption?: string;
    sketch?: { src: string; alt: string; viewBox: string; width: number; height: number };
  }>;
  chainElevatorTables?: Array<{ title: string; eyebrow?: string; headers: string[]; rows: string[][] }>;
  sectionLinks?: Array<{ id: string; label: string }>;
  parentBreadcrumb?: { label: string; to: string };
  relatedLinks?: Array<{ label: string; to: string; description: string }>;
  relatedLinksTitle?: string;
  usefulLinks?: Array<{ label: string; to: string; description: string }>;
  usefulLinksTitle?: string;
  compactLinkSections?: boolean;
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
