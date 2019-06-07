import { JsonixSitemapURLSet } from '../types';

// Create an empty Jsonix site map object
export const jsonixSitemapURLSet = (): JsonixSitemapURLSet => {
  return {
    name: {
      key: '{http://www.sitemaps.org/schemas/sitemap/0.9}urlset',
      localPart: 'urlset',
      namespaceURI: 'http://www.sitemaps.org/schemas/sitemap/0.9',
      prefix: '',
      string: '{http://www.sitemaps.org/schemas/sitemap/0.9}urlset',
    },
    value: {
      TYPE_NAME: 'sitemap.Urlset',
    },
  };
};
