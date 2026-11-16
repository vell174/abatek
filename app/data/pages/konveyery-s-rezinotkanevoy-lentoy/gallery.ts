import { beltProjectPhotos as photos } from '../_shared/belt-project-gallery';
import { gallery as flatGallery } from '../ploskie-lentochnye-konveyery/gallery';
import { gallery as troughGallery } from '../konveyer-lentochnyy-zhelobchatyy/gallery';

export const gallery = [
  photos.gravelScreening,
  photos.troughSmoothBelt,
  photos.outdoorTrough,
  photos.troughRollers,
  photos.smoothBelts,
  photos.vRollers,
  flatGallery[10],
  troughGallery[5],
  troughGallery[7],
] as const;
