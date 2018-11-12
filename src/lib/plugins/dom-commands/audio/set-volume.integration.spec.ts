import {
  getBgAudioPlayer,
  wait,
} from '../../../../test-support';
import { IV } from '../../../iv';

describe('.setVolume()', () => {
  let iv: IV;
  beforeEach(() => {
    iv = new IV();
    iv.variables = {};
  })

  test('it can set volume on the BG Audio', async () => {
    iv.node('anything')
      .bgAudio({ load: 'any.mp3' })
      .setVolume({ target: 'bg', volume: 0.2 });

    iv.run('anything');
    await wait()

    expect(getBgAudioPlayer().volume).toEqual(0.2);
  })

  test.skip('it can set volume on the BG Audio over time', async () => {
    // This test is unreliable...
    iv.node('anything')
      .setVolume({ target: 'bg', volume: 0 })
      .setVolume({ target: 'bg', volume: 1, time: 0.5 })

    iv.run('anything');

    await wait(203)
    expect(getBgAudioPlayer().volume).toBeGreaterThan(0);
    expect(getBgAudioPlayer().volume).toBeLessThan(1);

    await wait(201)
    expect(getBgAudioPlayer().volume).toBeGreaterThan(0.4);
    expect(getBgAudioPlayer().volume).toBeLessThan(1);

    await wait(201)
    expect(getBgAudioPlayer().volume).toEqual(1);
  })
})

