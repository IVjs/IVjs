import { audioSourceFactory } from './audio-commands';
import { create, createMockEngine } from '../../../../../test-support'

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
    });
  });
})
