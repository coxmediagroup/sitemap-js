import { ChangefreqOptions, PriorityOptions } from '../../types';

type namespaceURLOptions = 'http://www.sitemaps.org/schemas/sitemap/0.9';

type urlsetOptions = '{http://www.sitemaps.org/schemas/sitemap/0.9}urlset';

type sitemapIndexOptions = '{http://www.sitemaps.org/schemas/sitemap/0.9}urlset';

export type JsonixSitemapTypes = JsonixSitemapURLSet | JsonixSitemapIndex;

export type JsonixSitemapURLSetItem = {
  TYPE_NAME: 'sitemap.TUrl';
  loc: string;
  lastmod?: string;
  priority?: PriorityOptions;
  changefreq?: ChangefreqOptions;
};

export type JsonixSitemapURLSet = {
  name: {
    namespaceURI: namespaceURLOptions;
    localPart: 'urlset';
    prefix: '';
    key: urlsetOptions;
    string: urlsetOptions;
  };
  value: {
    TYPE_NAME: 'sitemap.Urlset';
    url?: JsonixSitemapURLSetItem[];
  };
};

export type JsonixSitemapIndexItem = {
  TYPE_NAME: 'siteindex.TSitemap';
  loc: string;
  lastmod?: string;
};

export type JsonixSitemapIndex = {
  name: {
    namespaceURI: namespaceURLOptions;
    localPart: 'sitemapindex';
    prefix: '';
    key: sitemapIndexOptions;
    string: sitemapIndexOptions;
  };
  value: {
    TYPE_NAME: 'siteindex.Sitemapindex';
    sitemap?: JsonixSitemapIndexItem[];
  };
};
