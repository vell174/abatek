import { createDrumPage } from '../_shared/drum-products';

export const pageData = {
  ...createDrumPage('privodnoy-baraban-konveyera'),
  hideProjects: false,
  projectsTitle: 'Выполненные проекты: приводные барабаны конвейера',
  referenceCard: {
    title: 'Типовые размеры приводных барабанов',
    description: 'Справочная таблица с габаритами, вариантами валов и схемами для подбора приводного барабана.',
    actionLabel: 'Открыть таблицу размеров',
    documentUrl: '/documents/tipovye-razmery-privodnyh-barabanov.pdf',
  },
};
