import type { PageSeo } from '~/data/pages/_shared/types';

export function usePageSeo(seo: PageSeo) {
  const siteOrigin = 'https://abatek.ru';
  const canonical = computed(() => new URL(seo.canonicalPath, siteOrigin).href);
  const imageUrl = computed(() => (seo.image ? new URL(seo.image.src, siteOrigin).href : undefined));

  useSeoMeta({
    title: seo.title,
    description: seo.description,
    robots: seo.robots,
    ogTitle: seo.openGraph.title,
    ogDescription: seo.openGraph.description,
    ogImage: imageUrl.value,
    ogImageAlt: seo.image?.alt,
    ogImageWidth: seo.image?.width,
    ogImageHeight: seo.image?.height,
    ogImageType: seo.image?.type,
    ogType: seo.openGraph.type,
    ogUrl: () => canonical.value,
    ogLocale: seo.openGraph.locale,
    ogSiteName: seo.openGraph.siteName,
    twitterCard: seo.twitter.card,
    twitterTitle: seo.twitter.title,
    twitterDescription: seo.twitter.description,
    twitterImage: imageUrl.value,
    twitterImageAlt: seo.image?.alt,
  });

  useHead(() => ({
    meta: [{ name: 'keywords', content: seo.keywords.join(', ') }],
    link: [
      { rel: 'canonical' as const, href: canonical.value },
      { rel: 'alternate' as const, hreflang: 'ru', href: canonical.value },
      { rel: 'alternate' as const, hreflang: 'x-default', href: canonical.value },
    ],
    script: [
      {
        type: 'application/ld+json',
        textContent: JSON.stringify({
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': seo.schema.pageType,
              '@id': `${canonical.value}#webpage`,
              url: canonical.value,
              name: seo.title,
              description: seo.description,
              inLanguage: 'ru-RU',
              isPartOf: { '@id': `${siteOrigin}/#website` },
              breadcrumb: { '@id': `${canonical.value}#breadcrumbs` },
              ...(imageUrl.value ? { primaryImageOfPage: { '@id': `${canonical.value}#primary-image` } } : {}),
              ...(seo.schema.entityType ? { mainEntity: { '@id': `${canonical.value}#main-entity` } } : {}),
            },
            {
              '@type': 'BreadcrumbList',
              '@id': `${canonical.value}#breadcrumbs`,
              itemListElement: seo.breadcrumbs.map((item, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                name: item.name,
                item: new URL(item.path, siteOrigin).href,
              })),
            },
            ...(imageUrl.value
              ? [
                  {
                    '@type': 'ImageObject',
                    '@id': `${canonical.value}#primary-image`,
                    contentUrl: imageUrl.value,
                    url: imageUrl.value,
                    caption: seo.image?.alt,
                    ...(seo.image?.width ? { width: seo.image.width } : {}),
                    ...(seo.image?.height ? { height: seo.image.height } : {}),
                  },
                ]
              : []),
            ...(seo.schema.entityType
              ? [
                  seo.schema.entityType === 'ItemList'
                    ? {
                        '@type': 'ItemList',
                        '@id': `${canonical.value}#main-entity`,
                        name: seo.schema.name,
                        numberOfItems: seo.schema.items?.length ?? 0,
                        itemListElement: (seo.schema.items ?? []).map((item, index) => ({
                          '@type': 'ListItem',
                          position: index + 1,
                          item: {
                            '@type': 'Product',
                            name: item.name,
                            ...(item.description ? { description: item.description } : {}),
                            ...(item.image ? { image: new URL(item.image, siteOrigin).href } : {}),
                            brand: { '@type': 'Brand', name: 'АБАТЭК' },
                            manufacturer: { '@id': `${siteOrigin}/#organization` },
                            ...(seo.schema.category ? { category: seo.schema.category } : {}),
                          },
                        })),
                      }
                    : {
                        '@type': seo.schema.entityType,
                        '@id': `${canonical.value}#main-entity`,
                        name: seo.schema.name,
                        description: seo.description,
                        ...(imageUrl.value ? { image: imageUrl.value } : {}),
                        ...(seo.schema.category ? { category: seo.schema.category } : {}),
                        ...(seo.schema.entityType === 'Product'
                          ? {
                              brand: { '@type': 'Brand', name: 'АБАТЭК' },
                              manufacturer: { '@id': `${siteOrigin}/#organization` },
                              additionalProperty: seo.schema.properties?.map((property) => ({
                                '@type': 'PropertyValue',
                                ...property,
                              })),
                            }
                          : {}),
                      },
                ]
              : []),
            {
              '@type': 'WebSite',
              '@id': `${siteOrigin}/#website`,
              url: `${siteOrigin}/`,
              name: 'АБАТЭК',
              alternateName: 'ABATEK',
              inLanguage: 'ru-RU',
              publisher: { '@id': `${siteOrigin}/#organization` },
            },
            {
              '@type': 'Organization',
              '@id': `${siteOrigin}/#organization`,
              name: 'АБАТЭК',
              alternateName: 'ABATEK',
              url: `${siteOrigin}/`,
              logo: `${siteOrigin}/favicon.svg`,
              email: 'zakaz@abatek.ru',
              telephone: '+7-951-117-22-10',
            },
          ],
        }),
      },
    ],
  }));
}
