const escapeXml = (value: string) =>
  value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');

export default defineEventHandler((event) => {
  const { siteDomain } = useRuntimeConfig(event);
  const domain = escapeXml(siteDomain);

  setResponseHeaders(event, {
    'cache-control': 'public, max-age=3600',
    'content-type': 'application/xml; charset=utf-8',
    'x-content-type-options': 'nosniff',
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<clientConfig version="1.1">
  <emailProvider id="${domain}">
    <domain>${domain}</domain>
    <displayName>АБАТЭК</displayName>
    <displayShortName>АБАТЭК</displayShortName>
    <incomingServer type="imap">
      <hostname>mail.${domain}</hostname>
      <port>993</port>
      <socketType>SSL</socketType>
      <authentication>password-cleartext</authentication>
      <username>%EMAILADDRESS%</username>
    </incomingServer>
    <outgoingServer type="smtp">
      <hostname>mail.${domain}</hostname>
      <port>465</port>
      <socketType>SSL</socketType>
      <authentication>password-cleartext</authentication>
      <username>%EMAILADDRESS%</username>
    </outgoingServer>
  </emailProvider>
</clientConfig>
`;
});
