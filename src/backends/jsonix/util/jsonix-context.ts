import { Jsonix } from 'jsonix';
import { siteindex, sitemap } from '../mappings';

const contextOpts = {
  namespacePrefixes: {
    'http://www.sitemaps.org/schemas/sitemap/0.9': '',
  },
};

/**
 * Define the "context" for Marshalling / Unmarshalling of "Site Map"
 * and "Site Map Index" XML data
 */
export const context = new Jsonix.Context([siteindex, sitemap], contextOpts);
