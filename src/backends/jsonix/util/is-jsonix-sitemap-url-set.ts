import { JsonixSitemapTypes, JsonixSitemapURLSet } from '../types';

/**
 * The schema of a "Site Map" is slightly different from a "Site Map Index". This function acts
 * as a "type guard" that helps Typescript understand the difference between the two.
 * See type guards:
 * http://www.typescriptlang.org/docs/handbook/advanced-types.html#user-defined-type-guards
 *
 * @param data Variable input of type JsonixSitemapURLSet or JsonixSitemapIndex
 * @returns Boolean
 */
export const isJsonixSitemapURLSet = (data: JsonixSitemapTypes): data is JsonixSitemapURLSet => {
  return (data as JsonixSitemapURLSet).value.TYPE_NAME === 'sitemap.Urlset';
};
