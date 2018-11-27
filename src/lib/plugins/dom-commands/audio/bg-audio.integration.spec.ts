import { getAudioPlayerNamed, wait } from '../../../../test-support';
import { IV } from '../../../iv';

describe('.bgAudio()', () => {
  let iv: IV;
  beforeEach(() => {
    iv = new IV();
    iv.variables = {};
  });

  test('loads audio', () => {
    iv.node('anything').bgAudio({ load: 'test.mp3' });
    iv.run('anything');

    expect(getAudioPlayerNamed('BG').src).toMatch(/test.mp3$/);
  });

  test('loops by default', () => {
    iv.node('anything').bgAudio({ load: 'test.mp3' });
    iv.run('anything');

    expect(getAudioPlayerNamed('BG').loop).toEqual(true);
  });

  test('settings override loop default', async () => {
    iv.settings.bgAudioLoop = false;
    iv.node('anything').bgAudio({ load: 'test.mp3' });
    iv.run('anything');

    await wait();

    expect(getAudioPlayerNamed('BG').loop).toEqual(false);
  });

  test('loads initial audio', () => {
    iv.settings = {
      bgAudioUrl: 'tester.mp3',
    };
    iv.node('anything');
    iv.run('anything');

    expect(getAudioPlayerNamed('BG').src).toMatch(/tester.mp3$/);
  });

  test('plays audio', async () => {
    const mock = jest.fn();
    iv.node('anything')
      .bgAudio({ load: 'test.mp3' })
      .bgAudio('play');

    iv.run('anything');
    getAudioPlayerNamed('BG').play = mock;
    await wait();

    expect(mock).toHaveBeenCalled();
  });
});
