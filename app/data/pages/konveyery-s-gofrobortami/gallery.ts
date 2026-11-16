import type { GalleryImage } from '../_shared/types';

export const gallery = [
  {
    src: '/images/belt-projects/sidewall/konveyer-s-gofrobortami-polnyy-vid.webp',
    alt: 'Наклонный ленточный конвейер с гофробортами, поперечными перегородками и горизонтальной зоной загрузки',
    width: 1448,
    height: 1086,
  },
  {
    src: '/images/belt-projects/sidewall/gofroborta-naklonnyy-uchastok.webp',
    alt: 'Гофроборта и поперечные перегородки на наклонном участке ленточного конвейера, крупный план',
    width: 1447,
    height: 1087,
  },
  {
    src: '/images/belt-projects/sidewall/gofroborta-lenta-i-peregorodki.webp',
    alt: 'Лента конвейера с боковыми гофробортами и поперечными перегородками у барабана',
    width: 1448,
    height: 1086,
  },
  {
    src: '/images/belt-projects/partitioned/mini-konveyer-s-peregorodkami-i-gofrobortami.jpg',
    alt: 'Изготовленный мини-конвейер с гофробортами и поперечными перегородками',
    width: 1600,
    height: 900,
  },
] as const satisfies readonly GalleryImage[];
