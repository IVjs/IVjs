import { IV } from './../iv';
import { create } from '../../../test-support/factories';

describe('bgAudio()', () => {
  let iv;
  beforeEach(() => iv = new IV())

  test('play', () => {
    const expectedObject = create('audioSourceCommand', {
      do: 'play',
      target: 'BG',
    });

    iv.node('anything').bgAudio('play');

    expect(iv.nodes[0].commands[0]).toEqual(expectedObject);
  })

  test('pause', () => {
    const expectedObject = create('audioSourceCommand', {
      do: 'pause',
      target: 'BG',
    });

    iv.node('anything').bgAudio('pause');

    expect(iv.nodes[0].commands[0]).toEqual(expectedObject);
  })

  test('load', () => {
    const expectedObject = create('audioSourceCommand', {
      do: 'load',
      target: 'BG',
      file: 'someAudio.mp3'
    });

    iv.node('anything').bgAudio({load: 'someAudio.mp3'});

    expect(iv.nodes[0].commands[0]).toEqual(expectedObject);
  })
})
