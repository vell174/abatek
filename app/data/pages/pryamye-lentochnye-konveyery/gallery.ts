import { beltProjectPhotos as photos } from '../_shared/belt-project-gallery';
import { gallery as flatGallery } from '../ploskie-lentochnye-konveyery/gallery';
import { gallery as troughGallery } from '../konveyer-lentochnyy-zhelobchatyy/gallery';

const selectedFlatPhotoNumbers = [5, 9, 11, 12, 13, 14, 15];
const selectedTroughPhotoNumbers = [6, 7, 9];

export const gallery = [
  {
    src: '/images/belt-projects/flat/konveyer-pryamoy-iz-nerzhaveyushchey-stali-s-pvh-lentoy.webp',
    alt: 'Прямой ленточный конвейер из нержавеющей стали с ПВХ-лентой',
    width: 800,
    height: 480,
  },
  photos.horizontalTrough,
  photos.smoothBelts,
  ...selectedFlatPhotoNumbers.map((number) => flatGallery[number - 1]),
  ...selectedTroughPhotoNumbers.map((number) => troughGallery[number - 1]),
] as const;
