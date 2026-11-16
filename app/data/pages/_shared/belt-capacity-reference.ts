import type { IndustrialPage } from './types';

export const beltCapacityReferenceCard = {
  compact: true,
  title: 'Производительность ленточного конвейера',
  description:
    'Справочная таблица объёмной производительности по ширине и скорости ленты, углу наклона конвейера и роликоопор.',
  actionLabel: 'Открыть таблицу производительности',
  documentUrl: '/documents/proizvoditelnost-lentochnogo-konveyera.pdf',
} satisfies NonNullable<IndustrialPage['referenceCard']>;
