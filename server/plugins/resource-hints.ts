// JS нужен только для гидратации и не участвует в первой отрисовке, поэтому
// modulepreload-ссылки получают низкий приоритет: полоса достаётся CSS,
// шрифту и LCP-изображению. Для предрендеренных страниц выполняется на сборке.
export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('render:html', (html) => {
    html.head = html.head.map((line) =>
      line.replaceAll('rel="modulepreload"', 'rel="modulepreload" fetchpriority="low"'),
    );
  });
});
