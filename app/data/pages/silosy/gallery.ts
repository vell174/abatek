import type { GalleryImage } from '../_shared/types';

const imageRoot = '/images/silos-projects';

export const gallery = [
  {
    src: `${imageRoot}/steel-silo-fabrication.webp`,
    fullSrc: `${imageRoot}/steel-silo-fabrication-full.webp`,
    alt: 'Изготовление цельносварного стального силоса в производственном цехе',
    width: 800,
    height: 600,
    fullWidth: 1600,
    fullHeight: 1200,
  },
  {
    src: `${imageRoot}/steel-silo-shipping.webp`,
    fullSrc: `${imageRoot}/steel-silo-shipping-full.webp`,
    alt: 'Отгрузка готового стального силоса на грузовой платформе',
    width: 800,
    height: 447,
    fullWidth: 848,
    fullHeight: 474,
  },
  {
    src: `${imageRoot}/vertical-steel-silos.webp`,
    fullSrc: `${imageRoot}/vertical-steel-silos-full.webp`,
    alt: 'Вертикальные стальные силосы для хранения сыпучих материалов на производственной площадке',
    width: 450,
    height: 800,
    fullWidth: 900,
    fullHeight: 1600,
  },
  {
    src: `${imageRoot}/welded-steel-silo-workshop.webp`,
    fullSrc: `${imageRoot}/welded-steel-silo-workshop-full.webp`,
    alt: 'Окрашенный цельносварной силос из стали в цехе перед отгрузкой',
    width: 800,
    height: 599,
    fullWidth: 1280,
    fullHeight: 958,
  },
] as const satisfies readonly GalleryImage[];
