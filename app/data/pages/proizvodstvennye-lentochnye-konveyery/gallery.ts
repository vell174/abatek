import type { GalleryImage } from '../_shared/types';

export const gallery = [
  {
    src: '/images/belt-projects/production/konveyer-dlya-markirovki-produktsii.webp',
    alt: 'конвейер для маркировки продукции',
    width: 768,
    height: 1280,
    imageFit: 'contain',
  },
  {
    src: '/images/belt-projects/production/konveyer-dlya-priema-detaley-so-stanka.webp',
    alt: 'конвейер для приема деталей со станка',
    width: 1600,
    height: 1200,
  },
  {
    src: '/images/belt-projects/production/peredvizhnoy-konveyer-dlya-makrirovki-gruza.webp',
    alt: 'Передвижной конвейер для макрировки груза',
    width: 576,
    height: 768,
    imageFit: 'contain',
  },
  {
    src: '/images/belt-projects/production/proizvodstvennyy-transporter.webp',
    alt: 'Производственный транспортер',
    width: 1600,
    height: 1200,
  },
  {
    src: '/images/belt-projects/production/transporter-dlya-pishchevogo-proizvodstva.webp',
    alt: 'Транспортер для пищевого производства',
    width: 1280,
    height: 768,
  },
  {
    src: '/images/belt-projects/production/transporter-s-reguliruemymi-bortami.webp',
    alt: 'Транспортер с регулируемыми бортами',
    width: 1280,
    height: 768,
  },
] as const satisfies readonly GalleryImage[];
