import type { GalleryImage } from '../_shared/types';

export const gallery = [
  {
    src: '/images/shlyuzovyy-pitatel-shp-150-s-vynesennymi-podshipnikami-abatek.webp',
    alt: 'Шлюзовой питатель ШП-150 с вынесенными подшипниковыми узлами производства АБАТЭК',
  },
  {
    src: '/images/rotornye-shlyuzovye-pitateli-shp-abatek-proizvodstvo.webp',
    alt: 'Роторные шлюзовые питатели ШП производства АБАТЭК перед установкой приводов',
  },
  {
    src: '/images/shlyuzovye-pitateli-shp-260-s-motor-reduktorami-abatek.webp',
    alt: 'Шлюзовые питатели ШП-260 с мотор-редукторами производства АБАТЭК',
  },
  {
    src: '/images/partiya-shlyuzovyh-pitateley-shp-200-abatek-proizvodstvo.webp',
    alt: 'Партия шлюзовых питателей ШП-200 производства АБАТЭК',
  },
] as const satisfies readonly GalleryImage[];
