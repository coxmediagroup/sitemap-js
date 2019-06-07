import { JsonixSitemapTypes } from '../types';
import { SitemapKinds } from '../../../types';

// Get the local part of the jsonix data name
export const sitemapKind = (data: JsonixSitemapTypes): SitemapKinds => {
  return data.name.localPart;
};
