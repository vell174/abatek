import type { PageSeo } from '../_shared/types';

const title = 'Калькулятор металла — расчёт веса и длины онлайн | АБАТЭК';
const description =
  'Рассчитайте вес металлопроката по размерам или длину по известной массе. Лист, трубы, арматура, уголок, швеллер и другие профили из стали и цветных металлов.';

export const seo = {
  title,
  description,
  keywords: [
    'калькулятор веса металла',
    'расчёт длины металлопроката',
    'вес трубы',
    'вес листа металла',
    'калькулятор арматуры',
  ],
  canonicalPath: '/kalkulyator-vesa-metalla/',
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  openGraph: { title, description, type: 'website', locale: 'ru_RU', siteName: 'АБАТЭК' },
  twitter: { card: 'summary_large_image', title, description },
  breadcrumbs: [
    { name: 'Главная', path: '/' },
    { name: 'Калькуляторы и справочники', path: '/poleznoe/' },
    { name: 'Калькулятор металла', path: '/kalkulyator-vesa-metalla/' },
  ],
  schema: { pageType: 'WebPage', name: title },
} satisfies PageSeo;
