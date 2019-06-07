import { FromXML } from '../../../types';

import { nomalizeData, sitemapKind, context } from '../util';

// From the "context", create the Jsonix unmarshall handler
const unmarshaller = context.createUnmarshaller();

/**
 * Sitemap XML to Sitemap data
 *
 * @param siteMapXML Site map (or Site map index) XML data
 * @returns Sitemap data (SitemapURLSetType or SitemapIndexType)
 */
export const fromXML = (stringXMLData: string): FromXML => {
  const data = unmarshaller.unmarshalString(stringXMLData);
  return { sitemapKind: sitemapKind(data), siteMapData: nomalizeData(data) };
};
