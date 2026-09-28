import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { beltVariantDefinitions } from '../../app/data/pages/_shared/belt-variant-definitions.ts';

const origin = process.env.CATALOG_CHECK_ORIGIN ?? 'http://127.0.0.1:3000';
const graphFrom = (html) =>
  [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].flatMap(
    ([, json]) => JSON.parse(json)['@graph'] ?? [],
  );
const parentResponse = await fetch(origin + '/lentochnye-konvejery/');
assert.equal(parentResponse.status, 200);
const parent = await parentResponse.text();
assert.equal((parent.match(/<h1\b/g) ?? []).length, 1);
assert(parent.includes('page-hero--custom-background'));
assert(
  parent.includes('--page-hero-background-image:url(&#39;/images/lentochnye-konveyery-ot-proizvoditelya.webp&#39;)'),
);
assert(parent.includes('product-intro-02--text-only'));
assert(!parent.includes('product-facts-03'));
assert.equal((parent.match(/industrial-page__intro-paragraph--justified/g) ?? []).length, 4);
const intro = parent.match(/<section\b[^>]*class="product-intro-02[^"]*"[\s\S]*?<\/section>/)?.[0];
assert(intro);
assert(!intro.includes('<figure'));
for (const phrase of [
  'купить ленточный конвейер',
  'Виды ленточных конвейеров',
  'Типы ленточных конвейеров',
  'производство ленточных конвейеров',
  'Цена ленточного конвейера',
  'производителей ленточных конвейеров',
  'завод ленточных конвейеров',
]) {
  assert(intro.includes(phrase), phrase);
}
assert.equal((parent.match(/scraper-product--category/g) ?? []).length, 31);
assert.equal((parent.match(/class="industrial-types__group"/g) ?? []).length, 10);
assert(!parent.includes('Устройство винтовое натяжное'));
assert(!parent.includes('Конвейер ленточный В-800'));
const sectionClasses = [...parent.matchAll(/<section\b[^>]*class="([^"]+)"/g)].map(([, classes]) => classes);
const galleryIndex = sectionClasses.indexOf('project-gallery');
assert(galleryIndex > 0);
assert.equal(sectionClasses[galleryIndex + 1], 'manufacturing-stages');
const itemList = graphFrom(parent).find((item) => item['@type'] === 'ItemList');
assert.equal(itemList.numberOfItems, 31);
assert(itemList.itemListElement.every((entry) => entry.item['@type'] === 'WebPage'));
const titles = new Set();
const descriptions = new Set();
await Promise.all(
  beltVariantDefinitions.map(async (definition) => {
    const path = '/' + definition.slug + '/';
    assert(parent.includes(path), path);
    assert(existsSync('public' + definition.image), definition.image);
    for (const name of ['data.ts', 'seo.ts', 'name-routers.ts'])
      assert(existsSync('app/data/pages/' + definition.slug + '/' + name));
    const response = await fetch(origin + path);
    assert.equal(response.status, 200, path);
    const html = await response.text();
    assert.equal((html.match(/<h1\b/g) ?? []).length, 1, path);
    const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
    const description = html.match(/name="description" content="([^"]+)"/)?.[1];
    assert(title && description, path);
    assert(!titles.has(title), title);
    assert(!descriptions.has(description), description);
    titles.add(title);
    descriptions.add(description);
    assert(html.includes('https://abatek.ru' + path), path);
    assert(html.includes('href="/lentochnye-konvejery/"'), path);
    assert(html.includes(definition.construction), path);
    assert(html.includes(definition.limitations), path);
    assert(html.includes('Пример конструктивного исполнения'), path);
    assert(html.includes('Параметры для расчёта конвейера'), path);
    const graph = graphFrom(html);
    assert(
      graph.some((item) => item['@type'] === 'Product'),
      path,
    );
    const breadcrumbs = graph.find((item) => item['@type'] === 'BreadcrumbList');
    assert(
      breadcrumbs.itemListElement.some((item) => item.item === 'https://abatek.ru/lentochnye-konvejery/'),
      path,
    );
    const image = await fetch(origin + definition.image);
    assert.equal(image.status, 200, definition.image);
    assert.match(image.headers.get('content-type'), /image\/webp/);
    console.log('OK: ' + path);
  }),
);
const sitemapResponse = await fetch(origin + '/sitemap.xml');
assert.equal(sitemapResponse.status, 200);
const sitemap = await sitemapResponse.text();
for (const definition of beltVariantDefinitions) assert(sitemap.includes('https://abatek.ru/' + definition.slug + '/'));
assert((await (await fetch(origin + '/robots.txt')).text()).includes('Sitemap: https://abatek.ru/sitemap.xml'));
console.log('OK: 31 routes, 10 classification groups, unique metadata, schema, images, project position and sitemap');
