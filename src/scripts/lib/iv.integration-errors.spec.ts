import { IV } from './iv';
import { create, wait, simulateLoadedNextVideo, simulatePlayThroughNextVideo, getCurrentVideo, getAudioPlayerNamed } from '../../test-support';

describe('testing for errors', () => {
  let iv: IV;
  beforeEach(() => iv = new IV())

  test('does not hang when returning to a node which previously ended with "goto"', async () => {
    iv.variables = {count: 0}
    iv.node('anything')
      .calculate({ storeIn: 'count', add: 1, var: 'count' })
      .goto('anything else')
      
    iv.node('anything else')
      .calculate({storeIn: 'count', add: 1, var: 'count'})
      .videoPlay({url: 'any.mp4', onComplete: 'anything'})

    iv.run('anything');
    await wait();
    simulatePlayThroughNextVideo();
    await wait();

    expect(iv.variables.count).toBeGreaterThan(2)
  });

})
