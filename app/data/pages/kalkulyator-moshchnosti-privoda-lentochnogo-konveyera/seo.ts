import type { PageSeo } from '../_shared/types';

const title = 'Калькулятор мощности привода ленточного конвейера — АБАТЭК';
const description =
  'Онлайн-расчёт мощности привода ленточного конвейера, тягового усилия, натяжения ленты и параметров роликоопор.';

export const seo = {
  title,
  description,
  keywords: [
    'расчёт мощности привода ленточного конвейера',
    'калькулятор ленточного конвейера',
    'мощность привода конвейера',
  ],
  canonicalPath: '/kalkulyator-moshchnosti-privoda-lentochnogo-konveyera/',
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  openGraph: { title, description, type: 'website', locale: 'ru_RU', siteName: 'АБАТЭК' },
  twitter: { card: 'summary_large_image', title, description },
  breadcrumbs: [
    { name: 'Главная', path: '/' },
    { name: 'Калькулятор мощности привода', path: '/kalkulyator-moshchnosti-privoda-lentochnogo-konveyera/' },
  ],
  schema: { pageType: 'WebPage', name: title },
} satisfies PageSeo;
