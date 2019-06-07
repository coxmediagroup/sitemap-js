export const siteindex = {
  defaultElementNamespaceURI: 'http://www.sitemaps.org/schemas/sitemap/0.9',
  elementInfos: [
    {
      elementName: 'sitemapindex',
      typeInfo: '.Sitemapindex',
    },
  ],
  name: 'siteindex',
  typeInfos: [
    {
      localName: 'TSitemap',
      propertyInfos: [
        {
          name: 'loc',
          required: true,
        },
        {
          name: 'lastmod',
        },
        {
          allowDom: false,
          collection: true,
          minOccurs: 0,
          mixed: false,
          name: 'any',
          type: 'anyElement',
        },
      ],
      typeName: 'tSitemap',
    },
    {
      localName: 'Sitemapindex',
      propertyInfos: [
        {
          allowDom: false,
          collection: true,
          minOccurs: 0,
          mixed: false,
          name: 'any',
          type: 'anyElement',
        },
        {
          collection: true,
          name: 'sitemap',
          required: true,
          typeInfo: '.TSitemap',
        },
      ],
      typeName: null,
    },
  ],
};
