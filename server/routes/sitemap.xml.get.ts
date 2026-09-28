import { equipmentRouteGroups } from '../../app/data/pages/equipment-routes';

export default defineEventHandler((event) => {
  const paths = new Set([
    '/',
    '/o-kompanii/',
    '/kontakty/',
    '/primery-rabot/',
    '/politika-konfidencialnosti/',
    '/politika-fajlov-kuki/',
    '/obrabotka-personalnyh-dannyh/',
    ...equipmentRouteGroups.map(({ slugs }) => `/${slugs[0]}/`),
  ]);
  const urls = [...paths].map((path) => `<url><loc>https://abatek.ru${path}</loc></url>`).join('\n');
  setHeader(event, 'content-type', 'application/xml; charset=UTF-8');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;
});
