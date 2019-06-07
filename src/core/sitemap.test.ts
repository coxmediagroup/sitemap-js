import { FilterFn } from '../types';

import { Sitemap } from './sitemap';

describe('Sitemap class', () => {
  let siteMapObj: Sitemap;
  let otherSitemapObj: Sitemap;

  describe('Basic use', () => {
    beforeEach(() => {
      siteMapObj = new Sitemap('urlset');
      otherSitemapObj = new Sitemap('urlset');
    });

    it('Should return an empty array ("empty" Sitemap)', () => {
      expect(siteMapObj.items()).toEqual([]);
    });

    it('Should sanitize input using `add` method', () => {
      siteMapObj.add({ loc: '\nhttps://www.ajc.com    ' });

      const expected = [{ loc: 'https://www.ajc.com' }];

      expect(siteMapObj.items()).toEqual(expected);
    });

    it('Should preserve insert order (and duplicate items should be merged)', () => {
      const siteMapItems = [
        { loc: 'https://www.ajc.com' },
        { loc: 'http://example.com' },
        { loc: 'https://www.ajc.com', lastmod: '2018-10-04' },
        { loc: 'http://example.com' },
      ];

      siteMapItems.map((siteMapItem) => siteMapObj.add(siteMapItem));

      const expected = [
        { loc: 'https://www.ajc.com', lastmod: '2018-10-04' },
        { loc: 'http://example.com' },
      ];
      expect(siteMapObj.items()).toEqual(expected);
    });

    it('Should return XML data', () => {
      const siteMapItems = [
        { loc: 'http://www.ajc.com' },
        { loc: 'http://example.com' },
        { loc: 'http://www.ajc.com', lastmod: '2018-10-04' },
        { loc: 'http://example.com' },
      ];
      siteMapItems.map((siteMapItem) => siteMapObj.add(siteMapItem));

      const actual = siteMapObj.toXML();
      const expected = Sitemap.formatXML(`
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <url>
          <loc>http://www.ajc.com</loc>
          <lastmod>2018-10-04</lastmod>
        </url>
        <url>
          <loc>http://example.com</loc>
        </url>
      </urlset>`);

      expect(actual).toEqual(expected);
    });

    it('Should be able to merge with another Site Map instance', () => {
      siteMapObj.add({ loc: 'https://www.ajc.com' });
      siteMapObj.add({ loc: 'http://www.example.com' });
      otherSitemapObj.add({ lastmod: '2018-10-03', loc: 'https://www.ajc.com' });
      siteMapObj.merge(otherSitemapObj);

      const actual = siteMapObj.items();
      const expected = [
        { loc: 'https://www.ajc.com', lastmod: '2018-10-03' },
        { loc: 'http://www.example.com' },
      ];

      expect(actual).toEqual(expected);
    });

    it('Should be able to apply a filtering function and return a new instance', () => {
      const siteMapItems = [
        { loc: 'http://www.example.com' },
        { loc: 'https://www.example.com' },
        { loc: 'https://www.google.com' },
      ];

      siteMapItems.map((item) => siteMapObj.add(item));

      // Example function to find site map records whose "loc" starts with 'https'
      const exampleFilterFn: FilterFn = (siteMapItem) => {
        return siteMapItem.loc.startsWith('https');
      };

      const actual = siteMapObj.find(exampleFilterFn).items();
      const expected = [
        {
          loc: 'https://www.example.com',
        },
        {
          loc: 'https://www.google.com',
        },
      ];

      expect(actual).toEqual(expected);
    });
  });

  describe('Static methods', () => {
    it('Should be able to instantiate from XML data', () => {
      const xmlData = `<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
        <url>
          <loc>https://www.ajc.com</loc>
          <lastmod>2018-10-04</lastmod>
        </url>
        <url>
          <loc>http://example.com</loc>
        </url>
       </urlset>`;

      const siteMapObj = Sitemap.fromXML(xmlData);

      const expected = [
        {
          loc: 'https://www.ajc.com',
          lastmod: '2018-10-04',
        },
        {
          loc: 'http://example.com',
        },
      ];

      expect(siteMapObj.items()).toEqual(expected);
    });

    it('Should be able to format XML consistently', () => {
      const xmlData = `<urlset
                                xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">     <url>
      <loc>https://www.ajc.com</loc>        <lastmod>2018-10-04</lastmod></url>
                     </urlset>
      `;
      const actual = Sitemap.formatXML(xmlData);
      const expected = Sitemap.formatXML(`
      <urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
        <url>
          <loc>https://www.ajc.com</loc>
          <lastmod>2018-10-04</lastmod>
        </url>
      </urlset>`);

      expect(actual).toBe(expected);
    });
  });
});
