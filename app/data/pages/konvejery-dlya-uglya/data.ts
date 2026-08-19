import { createApplicationPage, type ApplicationPageOptions } from '../_shared/create-application-page';

export const options = {
  slug: 'konvejery-dlya-uglya',
  title: 'Конвейеры для угля',
  shortTitle: 'угля',
  description: 'Ленточные конвейеры для непрерывной, безопасной транспортировки крупного и мелкого угля.',
  intro: [
    'Конвейеры применяются на предприятиях добычи, переработки и транспортировки угля: повышают производительность, сокращают ручной труд и обеспечивают непрерывную подачу материала.',
    'Конструкция адаптируется к фракции угля, длине трассы, климату и требованиям по снижению пыления.',
  ],
  hero: '/images/coal-conveyor-26553101.webp',
  feature: '/images/coal-conveyor-26553325.webp',
  featureTitle: 'Цены на угольные конвейеры',
  featureText: [
    'Стоимость определяется после расчёта производительности, трассы, отдельных узлов и конвейера в сборе.',
    'Современные материалы и закрытые исполнения снижают обслуживание, потери сырья, пыление и выбросы.',
  ],
  types: '/images/coal-conveyor-26553101.webp',
  tableSubject: 'угля',
  keywords: ['конвейер для угля', 'угольный транспортер', 'ленточный конвейер для угля'],
} satisfies ApplicationPageOptions;
export const pageData = createApplicationPage(options);
