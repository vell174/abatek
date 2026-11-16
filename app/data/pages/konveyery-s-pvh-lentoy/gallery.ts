import type { GalleryImage } from '../_shared/types';
import { gallery as flatGallery } from '../ploskie-lentochnye-konveyery/gallery';
import { flatBeltHero } from '../ploskie-lentochnye-konveyery/data';

const selectedNumbers = [2, 3, 4, 5, 7, 8, 9, 10, 12, 13, 14, 15, 17] as const;
const selectedPhotos = selectedNumbers.map((number) => {
  const photo = flatGallery[number - 1];
  if (!photo) throw new Error(`Фото №${number} отсутствует в галерее конвейеров с плоской лентой`);
  return photo;
});

export const gallery = [
  {
    src: '/images/belt-projects/pvc/konveyer-s-pvh-lentoy-dlya-shtuchnyh-gruzov-obshchiy-vid.webp',
    fullSrc: '/images/belt-projects/pvc/konveyer-s-pvh-lentoy-dlya-shtuchnyh-gruzov-obshchiy-vid.jpg',
    alt: 'Прямой конвейер с зелёной ПВХ-лентой для штучных грузов, общий вид',
    width: 800,
    height: 648,
    fullWidth: 982,
    fullHeight: 796,
  },
  {
    src: '/images/belt-projects/pvc/konveyer-s-pvh-lentoy-dlya-shtuchnyh-gruzov-rabochaya-poverhnost.webp',
    fullSrc: '/images/belt-projects/pvc/konveyer-s-pvh-lentoy-dlya-shtuchnyh-gruzov-rabochaya-poverhnost.jpg',
    alt: 'Рабочая поверхность прямого конвейера с зелёной ПВХ-лентой, вид вдоль линии',
    width: 500,
    height: 800,
    fullWidth: 678,
    fullHeight: 1084,
    imageFit: 'contain',
  },
  ...selectedPhotos,
  {
    src: flatBeltHero.src,
    alt: flatBeltHero.alt,
    width: flatBeltHero.width,
    height: flatBeltHero.height,
  },
] satisfies readonly GalleryImage[];
