import assert from 'node:assert/strict';

const response = await fetch('http://127.0.0.1:3000/lentochnye-konvejery/');
assert.equal(response.status, 200);
const html = await response.text();
const sectionClasses = [...html.matchAll(/<section\b[^>]*class="([^"]+)"/g)].map(([, classes]) => classes);
const galleryIndex = sectionClasses.indexOf('project-gallery');
assert(galleryIndex >= 0);
assert.equal(sectionClasses.filter((classes) => classes === 'project-gallery').length, 1);
assert.equal(sectionClasses[galleryIndex + 1], 'manufacturing-stages');
assert(galleryIndex > sectionClasses.indexOf('industrial-catalog'));
assert.match(html, /Выполненные проекты: Ленточные конвейеры от производителя/);
console.log('OK: belt conveyor projects appear once, after catalog and immediately before manufacturing stages');
