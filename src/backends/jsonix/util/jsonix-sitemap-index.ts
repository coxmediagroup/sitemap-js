import { JsonixSitemapIndex } from '../types';

// Create an empty Jsonix site map index object
export const jsonixSitemapIndex = (): JsonixSitemapIndex => {
  return {
    name: {
      key: '{http://www.sitemaps.org/schemas/sitemap/0.9}urlset',
      localPart: 'sitemapindex',
      namespaceURI: 'http://www.sitemaps.org/schemas/sitemap/0.9',
      prefix: '',
      string: '{http://www.sitemaps.org/schemas/sitemap/0.9}urlset',
    },
    value: {
      TYPE_NAME: 'siteindex.Sitemapindex',
    },
  };
};
