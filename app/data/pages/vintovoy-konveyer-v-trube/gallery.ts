import type { GalleryImage } from '../_shared/types';

const imageRoot = '/images/vintovoy-konveyer-v-trube/projects';

export const gallery = [
  {
    src: `${imageRoot}/01-vintovoy-konveyer-v-trube-s-patrubkom.webp`,
    fullSrc: `${imageRoot}/01-vintovoy-konveyer-v-trube-s-patrubkom-full.webp`,
    alt: 'Винтовой конвейер в трубе с загрузочным патрубком и мотор-редуктором',
    width: 1200,
    height: 900,
    fullWidth: 2000,
    fullHeight: 1500,
  },
  {
    src: `${imageRoot}/02-vintovoy-konveyer-dlya-tsementa.webp`,
    fullSrc: `${imageRoot}/02-vintovoy-konveyer-dlya-tsementa-full.webp`,
    alt: 'Винтовой конвейер для цемента с трубчатым корпусом и электроприводом',
    width: 1200,
    height: 611,
    fullWidth: 2000,
    fullHeight: 1019,
  },
  {
    src: `${imageRoot}/03-shnek-vnutri-trubchatogo-konveyera-krupnyy-plan.webp`,
    fullSrc: `${imageRoot}/03-shnek-vnutri-trubchatogo-konveyera-krupnyy-plan-full.webp`,
    alt: 'Шнек внутри трубы винтового конвейера, крупный план',
    width: 900,
    height: 1200,
    fullWidth: 1500,
    fullHeight: 2000,
  },
  {
    src: `${imageRoot}/04-trubchatye-konveyery-dlya-zerna-otgruzka.webp`,
    fullSrc: `${imageRoot}/04-trubchatye-konveyery-dlya-zerna-otgruzka-full.webp`,
    alt: 'Трубчатые шнековые конвейеры для зерна перед отгрузкой',
    width: 1200,
    height: 900,
    fullWidth: 2000,
    fullHeight: 1500,
  },
] as const satisfies readonly GalleryImage[];
