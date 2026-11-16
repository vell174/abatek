import type { GalleryImage } from './types';

export const beltProjectPhotos = {
  horizontalTrough: {
    src: '/images/belt-projects/gorizontalnyy-zhelobchatyy-konveyer.webp',
    alt: 'Горизонтальный желобчатый ленточный конвейер в производственном цехе',
    width: 1280,
    height: 720,
  },
  gravelScreening: {
    src: '/images/belt-projects/zhelobchatyy-konveyer-otsev-shchebnya.webp',
    alt: 'Наклонный желобчатый конвейер для подачи отсева щебня',
    width: 640,
    height: 640,
  },
  troughSmoothBelt: {
    src: '/images/belt-projects/zhelobchatyy-konveyer-gladkaya-lenta.webp',
    alt: 'Ленточный конвейер с гладкой лентой на роликоопорах в цехе',
    width: 1280,
    height: 720,
  },
  inclinedChevron: {
    src: '/images/belt-projects/naklonnyy-zhelobchatyy-konveyer-shevronnaya-lenta.webp',
    alt: 'Наклонный ленточный конвейер с шевронной лентой',
    width: 1032,
    height: 774,
  },
  outdoorTrough: {
    src: '/images/belt-projects/zhelobchatyy-lentochnyy-konveyer-na-ploshchadke.webp',
    alt: 'Желобчатый ленточный конвейер на металлоконструкции на открытой площадке',
    width: 970,
    height: 658,
  },
  bulkMaterial: {
    src: '/images/belt-projects/konveyer-dlya-sypuchego-gruza.webp',
    alt: 'Ленточный конвейер для подачи сыпучего груза на открытой площадке',
    width: 780,
    height: 1052,
    imageFit: 'contain',
  },
  troughRollers: {
    src: '/images/belt-projects/lenta-na-zhelobchatyh-rolikooporah.webp',
    alt: 'Желобчатая лента конвейера на наклонных роликоопорах',
    width: 1280,
    height: 720,
  },
  smoothBelts: {
    src: '/images/belt-projects/konveyery-s-gladkoy-lentoy.webp',
    alt: 'Два ленточных конвейера с гладкими лентами и мотор-редукторами',
    width: 1280,
    height: 768,
  },
  sandConveyor: {
    src: '/images/belt-projects/konveyer-dlya-peska.webp',
    alt: 'Ленточный конвейер под загрузочным бункером для подачи песка',
    width: 1033,
    height: 664,
  },
  mobilePotatoConveyor: {
    src: '/images/belt-projects/inclined/peredvizhnoy-naklonnyy-konveyer-dlya-kartofelya.webp',
    alt: 'Передвижной наклонный ленточный конвейер с перегородками для картофеля',
    width: 957,
    height: 1280,
    imageFit: 'contain',
  },
  mobilePartsConveyor: {
    src: '/images/belt-projects/inclined/peredvizhnoy-naklonnyy-konveyer-dlya-detaley.webp',
    alt: 'Передвижной наклонный конвейер с гладкой лентой для деталей',
    width: 959,
    height: 1280,
    imageFit: 'contain',
  },
  vRollers: {
    src: '/images/belt-projects/konveyer-v-obraznye-rolikoopory.webp',
    alt: 'Ленточный конвейер с V-образными роликоопорами в цехе',
    width: 1920,
    height: 1440,
  },
  shippingLongConveyor: {
    src: '/images/belt-projects/otgruzka-konveyera-kls-800.webp',
    alt: 'Отгрузка ленточного конвейера КЛС-800 длиной 25 метров',
    width: 1400,
    height: 1867,
    imageFit: 'contain',
  },
  shippingImpactTable: {
    src: '/images/belt-projects/otgruzka-konveyera-dempfernyy-stol.webp',
    alt: 'Отгрузка ленточного конвейера с демпферным столом',
    width: 1400,
    height: 1867,
    imageFit: 'contain',
  },
} as const satisfies Record<string, GalleryImage>;
