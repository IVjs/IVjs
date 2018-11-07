import { create } from '../../../../test-support/factories';
import { IV } from '../../../iv';

describe('bgAudio()', () => {
  let iv;
  beforeEach(() => iv = new IV())

  describe('string methods', () => {
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

    test('loop', () => {
      const expectedObject = create('audioSourceCommand', {
        do: null,
        target: 'BG',
        loop: true,
      });

      iv.node('anything').bgAudio('loop');

      expect(iv.nodes[0].commands[0]).toEqual(expectedObject);
    })
  });

  describe('shorthand invoke', () => {
    test('{load: file}', () => {
      const expectedObject = create('audioSourceCommand', {
        do: 'load',
        target: 'BG',
        file: 'someAudio.mp3'
      });

      iv.node('anything').bgAudio({load: 'someAudio.mp3'});

      expect(iv.nodes[0].commands[0]).toEqual(expectedObject);
    })

    test('{play: file}', () => {
      const expectedObject = create('audioSourceCommand', {
        do: 'play',
        target: 'BG',
        file: 'someAudio.mp3'
      });

      iv.node('anything').bgAudio({play: 'someAudio.mp3'});

      expect(iv.nodes[0].commands[0]).toEqual(expectedObject);
    })

    test('{loop: boolean}', () => {
      const expectedObject = create('audioSourceCommand', {
        do: null,
        target: 'BG',
        loop: true,
      });

      iv.node('anything').bgAudio({loop: true});

      expect(iv.nodes[0].commands[0]).toEqual(expectedObject);
    })
  });


  describe('audio action object', () => {
    test('{action: `play`}', () => {
      const expectedObject = create('audioSourceCommand', {
        do: 'play',
        target: 'BG',
        loop: true,
      });

      iv.node('anything').bgAudio({action: 'play', loop: true});

      expect(iv.nodes[0].commands[0]).toEqual(expectedObject);
    })

    test('{action: `load`, url: `file`}', () => {
      const expectedObject = create('audioSourceCommand', {
        do: 'load',
        target: 'BG',
        file: 'someAudio.mp3',
      });

      iv.node('anything').bgAudio({action: 'load', url: 'someAudio.mp3'});

      expect(iv.nodes[0].commands[0]).toEqual(expectedObject);
    })

  });
})
