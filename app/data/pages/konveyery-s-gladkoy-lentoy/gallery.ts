import { beltProjectPhotos as photos } from '../_shared/belt-project-gallery';
import { gallery as pieceGoodsGallery } from '../lentochnye-konveyery-dlya-shtuchnyh-gruzov/gallery';

export const gallery = [
  photos.troughSmoothBelt,
  photos.smoothBelts,
  photos.vRollers,
  photos.bulkMaterial,
  photos.troughRollers,
  photos.sandConveyor,
  ...pieceGoodsGallery,
] as const;
