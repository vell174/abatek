import { createApplicationPage, type ApplicationPageOptions } from '../_shared/create-application-page';
export const options = {
  slug: 'konvejery-dlya-obuvi',
  title: 'Конвейеры для обуви',
  shortTitle: 'обуви',
  description: 'Конвейерные системы для изготовления, упаковки и транспортировки обуви.',
  intro: [
    'Конвейер ускоряет производство и упаковку обуви, снижает риск ошибок и повышает общую эффективность предприятия.',
    'АБАТЭК производит отдельные узлы и целые системы по индивидуальному заказу из надёжных материалов, организует доставку по России.',
  ],
  hero: '/images/shoe-conveyor-hero-50729943.webp',
  feature: '/images/shoe-conveyor-hero-50729943.webp',
  featureTitle: 'Цены на конвейеры для обуви',
  featureText: [
    'Стоимость определяется составом системы, габаритами, производительностью и комплектацией. Каждый проект получает индивидуальный набор узлов.',
  ],
  types: '/images/shoe-conveyor-types-50730071.webp',
  tableSubject: 'обуви',
  keywords: ['конвейер для обуви', 'транспортер обуви', 'обувной конвейер'],
} satisfies ApplicationPageOptions;
export const pageData = createApplicationPage(options);
