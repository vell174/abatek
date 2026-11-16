import { createApplicationSeo } from '../_shared/create-application-page';
import { options } from './data';
export const seo = createApplicationSeo(options);
seo.image = {
  src: options.hero,
  alt: 'Наклонный ленточный конвейер с бортами для подачи мусора на сортировочную линию',
  type: 'image/webp',
  width: 1440,
  height: 1080,
};
