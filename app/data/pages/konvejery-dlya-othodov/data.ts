import { createApplicationPage, type ApplicationPageOptions } from '../_shared/create-application-page';
export const options = {
  slug: 'konvejery-dlya-othodov',
  title: 'Конвейеры для отходов и мусора',
  shortTitle: 'отходов и мусора',
  description: 'Конвейеры для погрузки, перемещения и сортировки ТБО, кусковых, металлических и бумажных отходов.',
  intro: [
    'Проектируем отдельные транспортеры и конвейерные системы под ключ для ТБО, отходов ЛДСП, ДСП, MDF, HDF, ДВП и ДВПО, металла, бумаги и других материалов.',
    'Оборудование автоматизирует погрузку и сортировку мусора; специалисты подбирают тип конвейера и систему под конкретную задачу.',
  ],
  hero: '/images/waste-conveyor-price-50027863.webp',
  feature: '/images/waste-conveyor-price-50027863.webp',
  featureTitle: 'Цены на конвейеры для отходов и мусора',
  featureText: [
    'Цена зависит от комплектации, производительности, материала и дополнительного оснащения. Возможно изготовление отдельного транспортера или комплексной системы.',
  ],
  types: '/images/bag-conveyor-types-26553325.webp',
  tableSubject: 'отходов',
  keywords: ['конвейер для отходов', 'транспортер мусора', 'конвейер ТБО'],
} satisfies ApplicationPageOptions;
export const pageData = createApplicationPage(options);
