import { JsonixSitemapTypes, JsonixSitemapURLSet, JsonixSitemapIndex } from '../types';
import { SitemapData, SitemapItem } from '../../../types';
import { cherryPick, createSitemapData } from '../../../utils';
import { isJsonixSitemapURLSet } from './is-jsonix-sitemap-url-set';

/**
 * Generic function to convert Jsonix data of JsonixSitemapURLSet or JsonixSitemapIndex
 * into normalized data of SitemapData
 *
 * @param data JsonixSitemapURLSet | JsonixSitemapIndex
 * @returns SitemapData
 */
export const nomalizeData = (data: JsonixSitemapTypes): SitemapData => {
  let allowedProperties: string[];
  let results;
  let siteMapData: SitemapData;

  if (isJsonixSitemapURLSet(data)) {
    allowedProperties = ['loc', 'lastmod', 'priority', 'changefreq'];
    results = (data as JsonixSitemapURLSet).value.url;
    siteMapData = createSitemapData('urlset');
  } else {
    allowedProperties = ['loc', 'lastmod'];
    results = (data as JsonixSitemapIndex).value.sitemap;
    siteMapData = createSitemapData('sitemapindex');
  }

  // create lookup and preserve key order
  if (results) {
    results.map((record) => {
      siteMapData.lookup[record.loc] = cherryPick(record, allowedProperties) as SitemapItem;
      siteMapData.insertOrder.push(record.loc);
    });
  }

  return siteMapData;
};
