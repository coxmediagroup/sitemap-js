import { SitemapData } from '../../../types';

import { denomalizeData, context } from '../util';

// From the "context", create the Jsonix marshall handler
const marshaller = context.createMarshaller();

/**
 * Sitemap data to Sitemap XML
 *
 * @param siteMapData (SitemapURLSetType or SitemapIndexType)
 * @returns string (XML Data)
 */
export const toXML = (siteMapData: SitemapData): string => {
  const data = denomalizeData(siteMapData);
  return marshaller.marshalString(data);
};
