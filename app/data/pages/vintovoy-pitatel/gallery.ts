import type { GalleryImage } from '../_shared/types';

const imageRoot = '/images/vintovoy-pitatel/projects';

export const gallery = [
  {
    src: `${imageRoot}/01-vintovoy-pitatel-5m.webp`,
    fullSrc: `${imageRoot}/01-vintovoy-pitatel-5m-full.webp`,
    alt: 'Винтовой питатель длиной 5 м с загрузочным патрубком и приводом',
    width: 780,
    height: 1040,
    fullWidth: 780,
    fullHeight: 1040,
  },
  {
    src: `${imageRoot}/02-vintovye-pitateli-v-zhelobe.webp`,
    fullSrc: `${imageRoot}/02-vintovye-pitateli-v-zhelobe-full.webp`,
    alt: 'Винтовые питатели в желобчатом исполнении перед монтажом',
    width: 957,
    height: 1280,
    fullWidth: 957,
    fullHeight: 1280,
  },
] as const satisfies readonly GalleryImage[];
