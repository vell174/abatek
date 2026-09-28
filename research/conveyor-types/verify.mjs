import assert from 'node:assert/strict';
import { catalog } from '../../app/data/pages/konveyery-po-vidam/data-catalog.ts';

const origin = process.env.CATALOG_CHECK_ORIGIN ?? 'http://127.0.0.1:3102';
const pagePath = '/konveyery-po-vidam/';
const response = await fetch(`${origin}${pagePath}`);
assert.equal(response.status, 200);
const html = await response.text();
assert.equal((html.match(/<h1\b/g) ?? []).length, 1);
assert.match(html, /Конвейеры и транспортеры по видам/);
assert.match(html, /<title>Купить конвейер от производителя/);
assert.equal((html.match(/class="[^"]*scraper-product--category/g) ?? []).length, 6);
assert.match(html, /page-hero-background-image[^>]*conveyor-types\.webp/);
assert.match(html, /product-intro-02--text-only/);
assert.equal((html.match(/industrial-page__intro-paragraph--justified/g) ?? []).length, 3);
assert(!html.includes('class="product-facts-03"'));
const introHtml = html.slice(html.indexOf('product-intro-02 site-container'));
assert(!introHtml.slice(0, introHtml.indexOf('</section>')).includes('<figure'));

const links = [...html.matchAll(/<link\b[^>]*>/g)].map(([link]) => link);
assert(
  links.some((link) => link.includes('rel="canonical"') && link.includes('https://abatek.ru/konveyery-po-vidam/')),
);
assert.match(html, /name="description"/);
assert.match(html, /property="og:image"/);

const scripts = [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)];
const graph = scripts.flatMap(([, json]) => JSON.parse(json)['@graph'] ?? []);
const collection = graph.find((item) => item['@type'] === 'CollectionPage');
const list = graph.find((item) => item['@type'] === 'ItemList');
assert(collection);
assert.equal(list.numberOfItems, 6);
assert.equal(list.itemListElement.length, 6);
assert(list.itemListElement.every((entry) => entry.item['@type'] === 'WebPage'));
assert(graph.some((item) => item['@type'] === 'BreadcrumbList'));

for (const card of catalog) {
  assert(html.includes(card.href));
  assert(html.includes(card.image));
  const child = await fetch(new URL(card.href, origin));
  assert.equal(child.status, 200, card.href);
  const childHtml = await child.text();
  assert.equal((childHtml.match(/<h1\b/g) ?? []).length, 1, card.href);
  const image = await fetch(new URL(card.image, origin));
  assert.equal(image.status, 200, card.image);
  assert.match(image.headers.get('content-type'), /image\/webp/);
  console.log(`OK: ${card.title} — destination and image`);
}

const home = await (await fetch(origin)).text();
assert(home.includes(pagePath));
assert(home.includes('/lentochnye-pitateli/'));
assert.equal((home.match(/class="home-categories__item"/g) ?? []).length, 8);
console.log('OK: overview SSR, H1, six cards, canonical, metadata, schema and homepage links');
