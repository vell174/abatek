import assert from 'node:assert/strict';

const origin = process.env.CATALOG_CHECK_ORIGIN ?? 'http://127.0.0.1:3000';
const paths = [
  '/',
  '/lentochnye-konvejery/',
  '/konveyery-po-vidam/',
  '/kontakty/',
  '/o-kompanii/',
  '/primery-rabot/',
  '/translation-verification-missing-page/',
];

await Promise.all(
  paths.map(async (path) => {
    const response = await fetch(origin + path, { headers: { accept: 'text/html' } });
    assert.equal(response.status, path.includes('missing-page') ? 404 : 200, path);
    const html = await response.text();
    const htmlTag = html.match(/<html\b[^>]*>/)?.[0];
    const bodyTag = html.match(/<body\b[^>]*>/)?.[0];
    assert(htmlTag && bodyTag, path);
    assert.match(htmlTag, /\blang="ru"/, path);
    for (const tag of [htmlTag, bodyTag]) {
      assert.match(tag, /\btranslate="no"/, path);
      assert.match(tag, /\bclass="[^"]*\bnotranslate\b[^"]*"/, path);
    }
    for (const name of ['google', 'googlebot']) {
      const meta = [...html.matchAll(/<meta\b[^>]*>/g)].find(([tag]) => tag.includes(`name="${name}"`));
      assert(meta && meta[0].includes('content="notranslate"'), path);
    }
    assert(!/\btranslate="(?:yes|)"/.test(html), path);
    if (path === '/lentochnye-konvejery/') {
      assert(html.includes('>АБАТЭК</b>'));
      assert(html.includes('>Заказать расчёт</button>'));
      assert(!html.includes('Пятидесятница'));
    }
    console.log('OK: translation protection ' + path);
  }),
);
