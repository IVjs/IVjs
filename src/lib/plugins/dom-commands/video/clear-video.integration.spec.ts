import {
  getCurrentVideo,
  simulateLoadedNextVideo,
  simulatePlayThroughNextVideo,
  wait,
} from '../../../../test-support';
import { IV } from '../../../iv';


describe('.clearVideo()', () => {
  let iv: IV;
  beforeEach(() => {
    iv = new IV();
    iv.variables = {};
  })

  test('it does not blow up (remove this test when actual functionality is tested)', async () => {
    iv.node('anything')
      .playVideo('test.mp4')
      .clearVideo();

    iv.run('anything');
    simulatePlayThroughNextVideo()
    await wait();

    expect(true).toBe(true);
  })
})

