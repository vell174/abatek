import { beltProjectPhotos as photos } from '../_shared/belt-project-gallery';

export const gallery = [
  photos.gravelScreening,
  photos.inclinedChevron,
  photos.outdoorTrough,
  photos.bulkMaterial,
  photos.sandConveyor,
  {
    src: '/images/belt-projects/inclined/naklonnyy-konveyer-s-shevronnoy-lentoy-i-peregorodkami.webp',
    alt: 'Наклонный ленточный конвейер с шевронной лентой и поперечными перегородками',
    width: 578,
    height: 434,
  },
  photos.mobilePotatoConveyor,
  photos.mobilePartsConveyor,
  {
    src: '/images/belt-projects/inclined/peredvizhnoy-naklonnyy-konveyer-s-pvh-lentoy-dlya-korobok.webp',
    alt: 'Передвижной наклонный конвейер с белой ПВХ-лентой и перегородками для коробок',
    width: 1200,
    height: 1600,
    imageFit: 'contain',
  },
  {
    src: '/images/belt-projects/inclined/naklonnyy-konveyer-s-pvh-lentoy-dlya-shtuchnyh-gruzov.webp',
    alt: 'Наклонный ленточный конвейер с ПВХ-лентой для штучных грузов',
    width: 720,
    height: 1280,
    imageFit: 'contain',
  },
  {
    src: '/images/belt-projects/inclined/naklonnye-konveyery-sortirovochnoy-linii.webp',
    alt: 'Наклонные ленточные конвейеры в составе линии сортировки',
    width: 578,
    height: 434,
  },
  {
    src: '/images/belt-projects/inclined/naklonnyy-konveyer-linii-sortirovki.webp',
    alt: 'Наклонный ленточный конвейер с подающим участком в линии сортировки',
    width: 578,
    height: 434,
  },
] as const;
