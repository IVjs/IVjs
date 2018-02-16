import { IV } from './iv';
import { create, wait, simulateLoadedNextVideo, simulatePlayThroughNextVideo, getCurrentVideo, getAudioPlayerNamed } from '../../test-support';

describe('integration', () => {
  let iv: IV;
  beforeEach(() => iv = new IV())

  describe('.videoPlay()', () => {
    test('it plays (loads) a video', () => {
      iv.node('anything').videoPlay('test.mp4');
      iv.run('anything');

      simulateLoadedNextVideo()
      
      expect(getCurrentVideo().src).toEqual('test.mp4');
    })

    test('it plays videos in sequence', async () => {
      iv.node('node1').videoPlay({ url: 'test.mp4', onComplete: 'node2' });
      iv.node('node2').videoPlay('test2.mp4');

      
      iv.run('node1');
      simulatePlayThroughNextVideo();
      await wait();

      simulateLoadedNextVideo()

      expect(getCurrentVideo().src).toEqual('test2.mp4');
    })
  })

  describe('.bgAudio()', () => {
    test('loads audio', () => {
      iv.node('anything').bgAudio({ load: 'test.mp3' });
      iv.run('anything');

      expect(getAudioPlayerNamed('BG').src).toEqual('test.mp3');
    })

    test('loads initial audio', () => {
      iv.settings = {
        bgAudioUrl: 'tester.mp3',
      }
      iv.node('anything');
      iv.run('anything');

      expect(getAudioPlayerNamed('BG').src).toEqual('tester.mp3');
    })

    test.skip('plays audio', () => {
      iv.node('anything')
        .bgAudio({ load: 'test.mp3' })
        .bgAudio('play');
      
      iv.run('anything');

      expect(getAudioPlayerNamed('BG').paused).toEqual(false);
    })

  })

})