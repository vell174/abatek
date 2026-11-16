import type { GalleryImage } from '../_shared/types';
import { gallery as flatBeltGallery } from '../ploskie-lentochnye-konveyery/gallery';

const projectPhotos = [
  {
    src: '/images/belt-projects/flat/konveyer-dlya-marikrovki-produktsii.webp',
    alt: 'Ленточный конвейер для подачи штучной продукции к маркировке',
  },
  {
    src: '/images/belt-projects/flat/konveyer-pryamoy-iz-nerzhaveyushchey-stali-s-pvh-lentoy.webp',
    alt: 'Прямой конвейер из нержавеющей стали с ПВХ-лентой для изделий',
  },
  {
    src: '/images/belt-projects/flat/konveyer-s-ploskoy-rabochey-vetvyu-dlya-paketov-s-mukoy.webp',
    alt: 'Плоский ленточный конвейер для пакетов с мукой',
  },
  {
    src: '/images/belt-projects/flat/peredvizhnoy-konveyer-s-pryamoy-pvh-lentoy.webp',
    alt: 'Передвижной конвейер с плоской ПВХ-лентой для штучных грузов',
  },
  {
    src: '/images/belt-projects/flat/pryamoy-konveyer-dlya-tsvetov-clean.webp',
    alt: 'Прямой ленточный конвейер для перемещения цветов',
  },
  {
    src: '/images/belt-projects/flat/pryamoy-konveyr-dlya-linii-sortirovki-stekla.webp',
    alt: 'Прямой конвейер для линии сортировки стекла',
  },
] as const;

export const gallery = projectPhotos.map(({ src, alt }) => {
  const photo = flatBeltGallery.find((image) => image.src === src);
  if (!photo) throw new Error(`Не найдено фото проекта: ${src}`);
  return { ...photo, alt };
}) satisfies readonly GalleryImage[];
