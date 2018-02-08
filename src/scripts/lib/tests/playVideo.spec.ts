import { IV } from './../iv';

describe('playVideo()', () => {
  let iv;
  beforeEach(() => iv = new IV())

  describe('when given a string', () => {
    test('it creates a valid video object', () => {
      const expectedObject = {
        name: 'addVideo',
        url: 'test.mp4',
      };

      iv.defineNode('anything').playVideo('test.mp4');

      expect(iv.nodes[0].commands[0]).toEqual(expectedObject);
    })
  })

  describe('when given an object', () => {
    test('it creates a valid video object', () => {
      const expectedObject = {
        name: 'addVideo',
        url: 'test.mp4',
      };

      iv.defineNode('anything').playVideo({url:'test.mp4'});

      expect(iv.nodes[0].commands[0]).toEqual(expectedObject);
    })
  })
})
