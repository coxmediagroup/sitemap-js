import { SitemapData, SitemapKinds, SitemapItem, FilterFn } from '../types';

import { EOL } from 'os';
import * as vkbeautify from 'vkbeautify';
import { backend } from '../backends/jsonix';
import { createSitemapData } from '../utils';

export class Sitemap {
  /**
   * Reads Site Map (or Site Map Index) XML data and returns a new Site Map instance.
   *
   * @param stringXMLData
   * @param sitemapType
   * @returns new Sitemap instance
   */
  public static fromXML(stringXMLString: string): Sitemap {
    try {
      const { sitemapKind, siteMapData } = backend.fromXML(stringXMLString);
      const obj = new Sitemap(sitemapKind);
      obj.data = siteMapData;
      return obj;
    } catch (err) {
      throw new Error(`Could not make new sitemap from XML: \n ${stringXMLString}`);
    }
  }

  public static formatXML(stringXMLString: string, options: { minified?: boolean } = {}): string {
    const { minified = false } = options;
    let formattedXML: string = stringXMLString;
    formattedXML = vkbeautify.xmlmin(formattedXML); // heavy minification
    formattedXML = formattedXML.trim(); // handle any whitespace wonkiness
    if (!minified) {
      formattedXML = vkbeautify.xml(formattedXML); // prettify XML (For readibility!)
      formattedXML = formattedXML += EOL; // Make sure the output contains a newline (\n or \r\n)
    }
    return formattedXML;
  }

  protected data: SitemapData;

  constructor(sitemapType: SitemapKinds) {
    this.data = createSitemapData(sitemapType);
  }

  /**
   * Return the count of Sitemap items
   */
  public get length() {
    return this.data.insertOrder.length;
  }

  /**
   * Adds a new Site Map Item to the Site Map Data and preserves insert order.
   *
   * @param siteMapItem
   */
  public add(siteMapItem: SitemapItem) {
    // Sanitize input
    // TODO: consider moving sanitization process into a static method
    const siteMapItemClean = { ...siteMapItem };
    siteMapItemClean.loc = siteMapItemClean.loc.trim();

    // Continue from sanitized input
    const { loc } = siteMapItemClean;
    Object.assign(this.data.lookup, { [loc]: siteMapItemClean });
    if (!this.data.insertOrder.includes(loc)) {
      this.data.insertOrder.push(loc);
    }
  }

  /**
   * Returns a filtered result of Site Map Data as a new Site Map instance.
   *
   * @param filterFn Function to filter results by
   * @returns a new Sitemap instance
   */
  public find(filterFn: FilterFn = () => true): Sitemap {
    const newObj = new Sitemap(this.data.kind);
    this.data.insertOrder
      .map(
        (keyURL): SitemapItem => {
          return this.data.lookup[keyURL];
        },
      )
      .filter(filterFn)
      .map((siteMapItem) => {
        newObj.add(siteMapItem);
      });
    return newObj;
  }

  public get kind(): SitemapKinds | undefined {
    return this.data.kind;
  }

  /**
   * Return the Site Map Items items sorted by order of insertion.
   */
  public items(): SitemapItem[] {
    return this.data.insertOrder.map((keyURL) => this.data.lookup[keyURL]);
  }

  /**
   * Merges external Site Map Data with this Site Map while preserving the insert order.
   *
   * @param otherSitemapObj
   * @returns void
   */
  public merge(otherSitemapObj: Sitemap): void {
    Object.assign(this.data.lookup, otherSitemapObj.data.lookup);
    this.data.insertOrder = this.data.insertOrder.concat(
      otherSitemapObj.data.insertOrder.filter((url) => !this.data.insertOrder.includes(url)),
    );
  }

  /**
   * Converts Site Map Data into Site Map XML or Site Map Index XML depending on the kind of this
   * Site Map Data; 'sitemap', 'sitemapindex'
   *
   * @returns Sitemap XML
   */
  public toXML(options: { minified?: boolean } = {}): string {
    return Sitemap.formatXML(backend.toXML(this.data), options);
  }
}
