import { getCurrentVideo, simulateLoadedNextVideo, simulatePlayThroughNextVideo, wait } from '../../../../test-support';
import { IV } from '../../../iv';

describe('.playVideo()', () => {
  let iv: IV;
  beforeEach(() => {
    iv = new IV();
    iv.variables = {};
  });

  test('it plays (loads) a video', () => {
    iv.node('anything').playVideo('test.mp4');
    iv.run('anything');

    simulateLoadedNextVideo();

    expect(getCurrentVideo().src).toMatch(/test.mp4$/);
  });

  test('it plays videos in sequence', async () => {
    iv.node('node1').playVideo({ url: 'test.mp4', goToNode: 'node2' });
    iv.node('node2').playVideo('test2.mp4');

    iv.run('node1');
    simulatePlayThroughNextVideo();
    await wait();

    simulateLoadedNextVideo();

    expect(getCurrentVideo().src).toMatch(/test2.mp4$/);
  });

  test('it runs a js command if supplied', async () => {
    const mock = jest.fn();
    iv.node('node1').playVideo({ url: 'test.mp4', js: mock });

    iv.run('node1');
    simulatePlayThroughNextVideo();
    await wait();

    expect(mock).toHaveBeenCalled();
  });
});
