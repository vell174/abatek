import type { GalleryImage } from '../_shared/types';
import { gallery as flatGallery } from '../ploskie-lentochnye-konveyery/gallery';
import { gallery as pvcGallery } from '../konveyery-s-pvh-lentoy/gallery';

export const gallery = [
  pvcGallery[0],
  pvcGallery[1],
  flatGallery[8],
  flatGallery[9],
  flatGallery[11],
  flatGallery[12],
  flatGallery[16],
] satisfies readonly GalleryImage[];
