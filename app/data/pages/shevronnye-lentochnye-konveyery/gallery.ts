import { beltProjectPhotos as photos } from '../_shared/belt-project-gallery';
import { gallery as inclinedGallery } from '../naklonnyj-lentochnyj-konvejer/gallery';

export const gallery = [
  photos.inclinedChevron,
  inclinedGallery[5],
  inclinedGallery[10],
  {
    src: '/images/belt-projects/chevron/shevronnyy-konveyer-v-tsekhu.jpg',
    alt: 'Ленточный конвейер с V-образным шевронным профилем ленты в производственном цехе',
    width: 1447,
    height: 1087,
  },
  {
    src: '/images/belt-projects/chevron/otgruzka-shevronnogo-konveyera-bez-nomera.png',
    alt: 'Отгрузка ленточного конвейера с шевронной лентой',
    width: 1447,
    height: 1087,
  },
  {
    src: '/images/belt-projects/chevron/shevronnaya-lenta-s-bortami-v-tsekhu.png',
    alt: 'Шевронная лента конвейера с направляющими бортами, крупный план',
    width: 1447,
    height: 1087,
  },
  {
    src: '/images/belt-projects/chevron/peredvizhnoy-konveyer-s-shevronnoy-lentoy.webp',
    alt: 'Передвижной наклонный конвейер с шевронной лентой на колёсной раме',
    width: 1196,
    height: 1600,
    imageFit: 'contain',
  },
] as const;
