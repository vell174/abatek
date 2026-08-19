import { createApplicationPage, type ApplicationPageOptions } from '../_shared/create-application-page';
export const options = {
  slug: 'konvejery-dlya-pelmeney',
  title: 'Конвейеры для пельменей и вареников',
  shortTitle: 'пельменей и вареников',
  description: 'Пищевые конвейеры для полной или частичной автоматизации производства пельменей и вареников.',
  intro: [
    'Ручное изготовление пельменей и вареников требует много времени. Конвейер полностью или частично автоматизирует производство, ускоряет процесс и уменьшает влияние человеческого фактора.',
    'Изготавливаем надёжное оборудование под технологическую линию, принимаем заявки по телефону, электронной почте и через сайт, организуем доставку по России.',
  ],
  hero: '/images/dumpling-conveyor-price-50730417.webp',
  feature: '/images/dumpling-conveyor-price-50730417.webp',
  featureTitle: 'Цены на конвейеры для пельменей',
  featureText: [
    'Стоимость зависит от исполнения, размеров, производительности, пищевых материалов и комплектации линии.',
  ],
  types: '/images/dumpling-conveyor-types-50730539.webp',
  tableSubject: 'пельменей',
  keywords: ['конвейер для пельменей', 'транспортер пельменей', 'конвейер для вареников'],
} satisfies ApplicationPageOptions;
export const pageData = createApplicationPage(options);
