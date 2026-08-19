import type { IndustrialPage, PageSeo } from './types';
import {
  conveyorCapacityTable,
  conveyorClassification,
  conveyorClosingSections,
  standardConveyorModels,
} from './application-conveyor';

export interface ApplicationPageOptions {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  intro: string[];
  hero: string;
  feature: string;
  featureTitle: string;
  featureText: string[];
  types?: string;
  tableSubject: string;
  keywords: string[];
  imageType?: 'image/jpeg' | 'image/png' | 'image/webp';
  extraSections?: IndustrialPage['sections'];
  standardTechnical?: boolean;
}

export function createApplicationPage(options: ApplicationPageOptions): IndustrialPage {
  const sections: IndustrialPage['sections'] = [
    { title: options.featureTitle, text: options.featureText, image: options.feature },
  ];
  if (options.types)
    sections.push({
      title: `Виды конвейеров для ${options.shortTitle.toLowerCase()}`,
      text: [
        'Тип трассы и несущей поверхности подбирается по характеристикам груза, технологической операции и условиям эксплуатации.',
      ],
      image: options.types,
    });
  sections.push(...(options.extraSections ?? []));
  if (options.standardTechnical !== false) sections.push(...conveyorClassification, ...standardConveyorModels);
  sections.push(...conveyorClosingSections);
  const page: IndustrialPage = {
    theme: 'teal',
    galleryTitle: `Виды конвейеров для ${options.shortTitle.toLowerCase()}`,
    title: options.title,
    seoTitle: `${options.title} от производителя`,
    description: options.description,
    image: options.hero,
    introTitle: options.title,
    intro: options.intro,
    facts:
      options.standardTechnical === false
        ? [
            ['4 материала', 'песок, грунт, земля и глина'],
            ['закрытая подача', 'снижение пыления'],
            ['до 12 месяцев', 'гарантия'],
            ['по ТЗ', 'производительность и трасса'],
          ]
        : [
            ['по ТЗ', 'индивидуальная конструкция'],
            ['7 трасс', 'варианты компоновки'],
            ['400–2000 мм', 'ширина ленты в таблице'],
            ['12 месяцев', 'гарантия'],
          ],
    sections,
  };
  if (options.standardTechnical !== false)
    page.table = {
      ...conveyorCapacityTable,
      title: `Максимально допустимая объёмная производительность транспортера для ${options.tableSubject}, V₀ (м³/ч), при скорости ленты v (м/с)`,
    };
  return page;
}

export function createApplicationSeo(options: ApplicationPageOptions): PageSeo {
  return {
    title: `${options.title} | АБАТЭК`,
    description: options.description,
    keywords: options.keywords,
    canonicalPath: `/${options.slug}/`,
    robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    image: { src: options.hero, alt: options.title, type: options.imageType ?? 'image/jpeg' },
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
      { name: 'Конвейеры', path: '/conveyors/' },
      { name: options.title, path: `/${options.slug}/` },
    ],
    schema: {
      pageType: 'CollectionPage',
      entityType: 'Product',
      name: options.title,
      category: 'Конвейерное оборудование',
    },
  };
}
