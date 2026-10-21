import { equipmentRouteGroups } from '../../app/data/pages/equipment-routes';
import { gallery as bunkerGallery } from '../../app/data/pages/bunkery-priemnye-nakopitelnye/gallery';
import { pageData as bunkerPage } from '../../app/data/pages/bunkery-priemnye-nakopitelnye/data';

const bunkerImageUrls = [bunkerPage.heroImage, ...bunkerGallery.map((image) => image.fullSrc ?? image.src)];

export default defineEventHandler((event) => {
  const paths = new Set([
    '/',
    '/o-kompanii/',
    '/kontakty/',
    '/primery-rabot/',
    '/kalkulyator-moshchnosti-privoda-lentochnogo-konveyera/',
    '/kalkulyatory/shirina-lenty/',
    '/kalkulyatory/usloviya-ekspluatatsii/',
    '/kalkulyatory/skorost-konveyera/',
    '/spravochniki/parametry-lentochnyh-konveyerov/',
    '/spravochniki/abrazivnost-gruzov/',
    '/spravochniki/svoystva-sypuchih-gruzov/',
    '/politika-konfidencialnosti/',
    '/politika-fajlov-kuki/',
    '/obrabotka-personalnyh-dannyh/',
    ...equipmentRouteGroups.map(({ slugs }) => `/${slugs[0]}/`),
  ]);
  const urls = [...paths]
    .map((path) => {
      const images =
        path === '/bunkery-priemnye-nakopitelnye/'
          ? bunkerImageUrls
              .map((src) => `<image:image><image:loc>https://abatek.ru${src}</image:loc></image:image>`)
              .join('')
          : '';
      return `<url><loc>https://abatek.ru${path}</loc>${images}</url>`;
    })
    .join('\n');
  setHeader(event, 'content-type', 'application/xml; charset=UTF-8');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${urls}\n</urlset>`;
});
