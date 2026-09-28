import type { GalleryImage } from '../_shared/types';

const imageRoot = '/images/vintovoy-konveyer-v-zhelobe/projects';

export const gallery = [
  {
    src: `${imageRoot}/01-vintovoy-konveyer-v-zhelobe-s-kryshkami-i-patrubkami.webp`,
    fullSrc: `${imageRoot}/01-vintovoy-konveyer-v-zhelobe-s-kryshkami-i-patrubkami-full.webp`,
    alt: 'Желобчатый винтовой конвейер с крышками и несколькими загрузочными патрубками',
    width: 1200,
    height: 900,
    fullWidth: 2000,
    fullHeight: 1500,
  },
  {
    src: `${imageRoot}/02-zhelobchatyy-vintovoy-konveyer-v-cehe.webp`,
    fullSrc: `${imageRoot}/02-zhelobchatyy-vintovoy-konveyer-v-cehe-full.webp`,
    alt: 'Длинный винтовой конвейер в желобе с загрузочными окнами в производственном цехе',
    width: 1200,
    height: 719,
    fullWidth: 2000,
    fullHeight: 1198,
  },
  {
    src: `${imageRoot}/03-vintovoy-konveyer-v-zhelobe-s-motor-reduktorom.webp`,
    fullSrc: `${imageRoot}/03-vintovoy-konveyer-v-zhelobe-s-motor-reduktorom-full.webp`,
    alt: 'Закрытый желобчатый винтовой конвейер с крышками и мотор-редуктором',
    width: 1200,
    height: 900,
    fullWidth: 2000,
    fullHeight: 1500,
  },
  {
    src: `${imageRoot}/04-vitki-shneka-v-zhelobe-konveyera.webp`,
    fullSrc: `${imageRoot}/04-vitki-shneka-v-zhelobe-konveyera-full.webp`,
    alt: 'Витки шнека внутри винтового конвейера с открытыми участками желоба',
    width: 900,
    height: 1200,
    fullWidth: 1600,
    fullHeight: 2133,
  },
  {
    src: `${imageRoot}/05-torets-zhelobchatogo-vintovogo-konveyera.webp`,
    fullSrc: `${imageRoot}/05-torets-zhelobchatogo-vintovogo-konveyera-full.webp`,
    alt: 'Торцевой вид винтового конвейера: полуцилиндрический желоб, вал и виток шнека',
    width: 1200,
    height: 900,
    fullWidth: 2000,
    fullHeight: 1500,
  },
  {
    src: `${imageRoot}/06-sektsionnyy-shnekovyy-konveyer-v-otkrytom-zhelobe.webp`,
    fullSrc: `${imageRoot}/06-sektsionnyy-shnekovyy-konveyer-v-otkrytom-zhelobe-full.webp`,
    alt: 'Секционный шнековый конвейер с открытыми участками желоба',
    width: 1200,
    height: 900,
    fullWidth: 2000,
    fullHeight: 1500,
  },
] as const satisfies readonly GalleryImage[];
