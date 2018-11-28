import {
  getCurrentVideo,
  simulateLoadedNextVideo,
  simulatePlayThroughNextVideo,
  wait,
  getAllVideos,
} from '../../../../test-support';
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

  test.skip('it does not add a player when not invoked', () => {
    // This test currently fails, but we should make it pass at a later time.
    // Videos should not be added to the DOM if they aren't needed
    const startingVideoPlayers = getAllVideos();
    expect(startingVideoPlayers).toHaveLength(0);

    iv.node('anything');
    iv.run('anything');

    const endingVideoPlayers = getAllVideos();
    expect(endingVideoPlayers).toHaveLength(0);
  });
});
