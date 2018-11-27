import * as utils from './utils';

describe('utils', () => {
  describe('sanitizeUrl()', () => {
    const sanitizeUrl = utils.sanitizeUrl;
    it('prepends the origin to a url that starts with /', () => {
      // the origin seems to be set by Jest or JSDOM as localhost
      expect(sanitizeUrl('/my/things')).toEqual('http://localhost/my/things');
    });

    it('prepends the protocol to a url that starts with //', () => {
      // the origin seems to be set by Jest or JSDOM as localhost
      expect(sanitizeUrl('//example.com/my/things')).toEqual('http://example.com/my/things');
    });

    it('returns the given string if it does not start with /', () => {
      // the origin seems to be set by Jest or JSDOM as localhost
      expect(sanitizeUrl('example.com/my/things')).toEqual('example.com/my/things');
    });

    it('root files are prepended with the origin', () => {
      // the origin seems to be set by Jest or JSDOM as localhost
      expect(sanitizeUrl('things.mp4')).toEqual('http://localhost/things.mp4');
    });
  });

  describe('urlsMatchConsideringThisDomain()', () => {
    const urlsMatchConsideringThisDomain = utils.urlsMatch;
    it('starting with a /', () => {
      // the origin seems to be set by Jest or JSDOM as localhost
      expect(urlsMatchConsideringThisDomain('/my/things', 'http://localhost/my/things')).toBeTruthy();
    });

    it('root files', () => {
      // the origin seems to be set by Jest or JSDOM as localhost
      expect(urlsMatchConsideringThisDomain('things.mp4', 'http://localhost/things.mp4')).toBeTruthy();
    });

    it('starting with a //', () => {
      // the origin seems to be set by Jest or JSDOM as localhost
      expect(urlsMatchConsideringThisDomain('//example.com/my/things', 'http://example.com/my/things')).toBeTruthy();
    });

    it('without any /', () => {
      // the origin seems to be set by Jest or JSDOM as localhost
      expect(urlsMatchConsideringThisDomain('example.com/my/things', 'example.com/my/things')).toBeTruthy();
    });

    it('mismatches are false', () => {
      // the origin seems to be set by Jest or JSDOM as localhost
      expect(urlsMatchConsideringThisDomain('example.com/my/things', 'http://example.com/my/things')).toBeFalsy();
    });
  });
});
