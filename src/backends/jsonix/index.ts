/**
 * Backend - Jsonix: Consolidate the implementation of the Jsonix library into one module.
 *
 * Jsonix
 * * https://github.com/highsource/jsonix
 */

import { fromXML, toXML } from './core';

export const backend = {
  fromXML,
  toXML,
};
