import { SitemapData, SitemapKinds } from '../types';

/**
 * Helper function to create a Site Map Data structure
 *
 * @param sitemapKind
 */
export const createSitemapData = (sitemapKind: SitemapKinds = 'urlset'): SitemapData => {
  return {
    insertOrder: [],
    kind: sitemapKind,
    lookup: {},
  };
};
