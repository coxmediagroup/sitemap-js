export type PriorityOptions = 0.1 | 0.2 | 0.3 | 0.4 | 0.5 | 0.6 | 0.7 | 0.8 | 0.9 | 1.0;

export type ChangefreqOptions =
  | 'always'
  | 'hourly'
  | 'daily'
  | 'weekly'
  | 'monthly'
  | 'yearly'
  | 'never';

export type SitemapKinds = 'urlset' | 'sitemapindex';

export type SitemapIndexItem = {
  loc: string;
  lastmod?: string;
};

export type SitemapURLItem = {
  loc: string;
  lastmod?: string;
  priority?: PriorityOptions;
  changefreq?: ChangefreqOptions;
};

export type SitemapData = {
  lookup: {
    [key: string]: SitemapURLItem | SitemapIndexItem;
  };
  insertOrder: string[];
  kind: SitemapKinds;
};

export type SitemapItem = SitemapURLItem & SitemapIndexItem;

export type FilterFn = (siteMapItem?: SitemapItem) => boolean;

export type FromXML = {
  sitemapKind: SitemapKinds;
  siteMapData: SitemapData;
};
