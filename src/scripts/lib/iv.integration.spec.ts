import { IV } from './iv';
import { create, getVisibleVideos, simulateEventOnElement, wait } from '../../test-support';

describe('integration', () => {
  let iv: IV;
  beforeEach(() => iv = new IV())

  describe('.videoPlay()', () => {
    test('it plays (loads) a video', () => {
      iv.node('anything').videoPlay('test.mp4');
      iv.run('anything');
      expect(getVisibleVideos()[0].src).toEqual('test.mp4');
    })

    test('it plays videos in sequence', async () => {
      iv.node('node1').videoPlay({ url: 'test.mp4', onComplete: 'node2' });
      iv.node('node2').videoPlay('test2.mp4');

      iv.run('node1');
      simulateEventOnElement('ended', getVisibleVideos()[0]);
      await wait();

      expect(getVisibleVideos()[0].src).toEqual('test2.mp4');
    })
  })

})