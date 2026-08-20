const escapeHtml = (value: string) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

export default defineEventHandler((event) => {
  const { siteDomain } = useRuntimeConfig(event);
  const domain = escapeHtml(siteDomain);
  const siteUrl = `https://${domain}`;
  const email = `zakaz@${domain}`;

  setResponseHeaders(event, {
    'cache-control': 'public, max-age=3600',
    'content-type': 'text/html; charset=utf-8',
    'x-content-type-options': 'nosniff',
  });

  return `<!doctype html>
<html lang="ru">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Подпись электронной почты АБАТЭК</title>
  </head>
  <body style="margin: 0; padding: 24px; background: #fff">
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="width: 100%; max-width: 600px; border-collapse: collapse; font-family: Arial, Helvetica, sans-serif">
      <tr>
        <td style="width: 82px; padding: 0 18px 0 0; vertical-align: top">
          <a href="${siteUrl}/" style="text-decoration: none">
            <img src="${siteUrl}/mail/logo.png" width="72" height="72" alt="АБАТЭК" style="display: block; width: 72px; height: 72px; border: 0" />
          </a>
        </td>
        <td style="padding: 0 0 0 18px; vertical-align: top; border-left: 3px solid #ffd20a">
          <div style="margin: 0 0 3px; font-size: 19px; font-weight: 700; line-height: 1.3; color: #0757a4">ООО «АБАТЭК»</div>
          <div style="margin: 0 0 10px; font-size: 12px; line-height: 1.4; color: #526579">Конвейерные решения</div>
          <div style="margin: 0 0 4px; font-size: 13px; line-height: 1.45; color: #031d38">
            <strong>Тел.:</strong>
            <a href="tel:+78005051915" style="color: #0757a4; text-decoration: none">8 (800) 505-19-15</a>
            &nbsp;·&nbsp;
            <a href="tel:+79511172210" style="color: #0757a4; text-decoration: none">8 (951) 117-22-10</a>
          </div>
          <div style="margin: 0 0 4px; font-size: 13px; line-height: 1.45; color: #031d38">
            <strong>E-mail:</strong>
            <a href="mailto:${email}" style="color: #0757a4; text-decoration: none">${email}</a>
          </div>
          <div style="font-size: 13px; line-height: 1.45; color: #031d38">
            <strong>Сайт:</strong>
            <a href="${siteUrl}/" style="color: #0757a4; text-decoration: none">${domain}</a>
          </div>
        </td>
      </tr>
    </table>
  </body>
</html>
`;
});
