export const sitemap = {
  defaultElementNamespaceURI: 'http://www.sitemaps.org/schemas/sitemap/0.9',
  elementInfos: [
    {
      elementName: 'urlset',
      typeInfo: '.Urlset',
    },
  ],
  name: 'sitemap',
  typeInfos: [
    {
      localName: 'Urlset',
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
          name: 'url',
          required: true,
          typeInfo: '.TUrl',
        },
      ],
      typeName: null,
    },
    {
      localName: 'TUrl',
      propertyInfos: [
        {
          name: 'loc',
          required: true,
        },
        {
          name: 'lastmod',
        },
        {
          name: 'changefreq',
          typeInfo: '.TChangeFreq',
        },
        {
          name: 'priority',
          typeInfo: 'Decimal',
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
      typeName: 'tUrl',
    },
    {
      localName: 'TChangeFreq',
      type: 'enumInfo',
      values: ['always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never'],
    },
  ],
};
