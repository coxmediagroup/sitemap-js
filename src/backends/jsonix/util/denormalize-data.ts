import { JsonixSitemapTypes } from '../types';
import { SitemapData } from '../../../types';

import { jsonixSitemapIndex } from './jsonix-sitemap-index';
import { jsonixSitemapURLSet } from './jsonix-sitemap-url-set';

/**
 * Convert site map data into Jsonix format
 *
 * @param data Normalized site map data
 * @returns Denormalized Jsonix formatted data
 */
export const denomalizeData = (siteMapData: SitemapData): JsonixSitemapTypes => {
  let jsonixData: JsonixSitemapTypes;
  let jsonixElementName: string;
  let jsonixElementData: {};

  if (siteMapData.kind === 'urlset') {
    jsonixData = jsonixSitemapURLSet();
    jsonixElementName = 'url';
    jsonixElementData = { TYPE_NAME: 'sitemap.TUrl' };
  } else {
    jsonixData = jsonixSitemapIndex();
    jsonixElementName = 'sitemap';
    jsonixElementData = { TYPE_NAME: 'sitemap.TSitemap' };
  }

  if (siteMapData.insertOrder) {
    jsonixData.value[jsonixElementName] = siteMapData.insertOrder.map((keyURL) => {
      return {
        ...jsonixElementData,
        ...{ loc: keyURL },
        ...siteMapData.lookup[keyURL],
      };
    });
  }

  return jsonixData;
};
