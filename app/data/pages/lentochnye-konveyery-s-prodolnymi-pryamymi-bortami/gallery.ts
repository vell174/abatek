import type { GalleryImage } from '../_shared/types';
import { gallery as flatGallery } from '../ploskie-lentochnye-konveyery/gallery';
import { gallery as partitionedGallery } from '../konveyery-s-poperechnymi-peregorodkami/gallery';
import { gallery as sortingGallery } from '../lentochnye-konveyery-dlya-sortirovki/gallery';
import { gallery as miniGallery } from '../mini-lentochnyy-konveyer/gallery';

export const gallery = [
  {
    src: '/images/belt-projects/production/transporter-s-reguliruemymi-bortami.webp',
    alt: 'Ленточный конвейер с регулируемыми прямыми продольными направляющими',
    width: 1280,
    height: 768,
  },
  flatGallery[10],
  partitionedGallery[0],
  {
    src: '/images/belt-projects/production/proizvodstvennyy-transporter.webp',
    alt: 'Производственный ленточный конвейер с прямыми продольными бортами по обеим сторонам ленты',
    width: 1600,
    height: 1200,
  },
  {
    ...sortingGallery[9],
    alt: 'Наклонный сортировочный конвейер с прямыми продольными бортами и поперечными перегородками',
    width: 957,
    height: 1280,
    imageFit: 'contain',
  },
  {
    ...sortingGallery[12],
    alt: 'Сортировочный ленточный конвейер с регулируемыми продольными направляющими',
    width: 702,
    height: 536,
  },
  partitionedGallery[4],
  miniGallery[0],
  {
    src: '/images/construction-conveyor-site-hero.webp',
    alt: 'Ленточный конвейер с прямыми продольными бортами на строительной площадке',
    width: 1672,
    height: 941,
  },
] satisfies readonly GalleryImage[];
