import { audioSourceFactory, audioVolumeFactory } from './audio-commands';
import { create, createMockEngine, getAudioPlayerNamed } from '../../../../../test-support'

jest.mock('./audio-controller');
import { audioController } from './audio-controller';

describe('audio-command-factories', () => {
  const validSettings = () => ({
    settings: create('ivSettings'),
    commandEngine: createMockEngine(),
    variables: {}
  })

  describe('audio-source-factory', () => {
    describe('target func obj', () => {
      test('it produces a valid TFO', () => {
        const tfo = audioSourceFactory(validSettings());

        expect(tfo).toHaveProperty('audioSource')
        expect(typeof tfo.audioSource).toEqual('function')
      })

      test('it calls for creating players', () => {
        const tfo = audioSourceFactory(validSettings());
        expect(audioController.createPlayers).toHaveBeenCalled();
      })

      test('it sets an initial file if present', () => {
        const settings = validSettings();
        settings.settings.bgAudioUrl = 'someInitialFile.mp3';
        const tfo = audioSourceFactory(settings);
        expect(audioController.load).toHaveBeenCalledWith('BG','someInitialFile.mp3');
      })
    });

    describe('actual function', () => {
      test('it plays', () => {
        const tfo = audioSourceFactory(validSettings());
        const command = create('audioSourceCommand', {
          do: 'play',
          target: 'BG',
          file: 'any.mp3'
        })

        tfo.audioSource(command);

        expect(audioController.play).toHaveBeenCalledWith('BG', 'any.mp3')
      });

      test('it pauses', () => {
        const tfo = audioSourceFactory(validSettings());
        const command = create('audioSourceCommand', {
          do: 'pause',
          target: 'BG',
        })

        tfo.audioSource(command);

        expect(audioController.pause).toHaveBeenCalledWith('BG')
      });

      test('it loads', () => {
        const tfo = audioSourceFactory(validSettings());
        const command = create('audioSourceCommand', {
          do: 'load',
          target: 'BG',
          file: 'any.mp3'
        })

        tfo.audioSource(command);

        expect(audioController.load).toHaveBeenCalledWith('BG', 'any.mp3')
      });

      test('it loops', () => {
        const tfo = audioSourceFactory(validSettings());
        const command = create('audioSourceCommand', {
          do: 'load',
          target: 'BG',
          file: 'any.mp3',
          loop: true,
        })

        tfo.audioSource(command);

        expect(audioController.loop).toHaveBeenCalledWith('BG', true)
      });
    });
  });

  describe('audio-volume-factory', () => {
    describe('target func obj', () => {
      test('it produces a valid TFO', () => {
        const tfo = audioVolumeFactory(validSettings());

        expect(tfo).toHaveProperty('audioVolume')
        expect(typeof tfo.audioVolume).toEqual('function')
      })

      test('it calls for creating players', () => {
        const tfo = audioVolumeFactory(validSettings());
        expect(audioController.createPlayers).toHaveBeenCalled();
      })
    });

    describe('actual function', () => {
      test('it adjusts the audio', () => {
        const tfo = audioVolumeFactory(validSettings());
        const command = create('audioVolumeCommand', {
          target: 'BG',
          volume: 1,
        })

        tfo.audioVolume(command);

        expect(audioController.volume).toHaveBeenCalledWith('BG', 1)
      });

      test('it adjusts the audio over time', () => {
        const tfo = audioVolumeFactory(validSettings());
        const command = create('audioVolumeCommand', {
          target: 'BG',
          volume: 0,
          time: 1000,
        })

        tfo.audioVolume(command);

        expect(audioController.volume).toHaveBeenCalledWith('BG', 0, 1000)
      });
    });
  });
})
