import { getAllAudioPlayers, simulateEventOnElement, simulatePlayThroughAudio, wait } from '../../../../test-support'
import { defaults } from '../../../config'
import { audioController } from './audio-controller';

describe('audio-controller', () => {
  let baseEl;
  beforeEach(() => {
    baseEl = document.getElementById(defaults.baseElementId);
  })
  describe('setup', () => {
    test('it adds players to the proper element', () => {
      audioController.createPlayers(baseEl);
      expect(document.querySelectorAll(`#${defaults.baseElementId} audio`).length).toEqual(2)
    })

    test('it does not re-add players', () => {
      audioController.createPlayers(baseEl);
      audioController.createPlayers(baseEl);
      expect(getAllAudioPlayers().length).toEqual(2)
    })
  })

  describe('player manipulation', () => {
    beforeEach(() => {
      audioController.createPlayers(baseEl);
    })

    describe('each player', () => {
      const playerNames = ['BG'];
      // const playerNames = ['BG', 'SFX'];
      let player: HTMLAudioElement;
      playerNames.forEach((playerName: ICommand.AudioSource['target']) => {

        describe('play()', () => {
          test(`it sets the source of ${playerName} audio`, () => {
            player = audioController.getPlayerNamed(playerName);
            audioController.play(playerName, 'anything.mp4');
            expect(player.src).toMatch(/anything.mp4$/);
          });

          test(`it plays the ${playerName} audio`, () => {
            const play = jest.fn();
            player = audioController.getPlayerNamed(playerName);
            player.play = play;

            audioController.play(playerName, 'anything.mp4');

            expect(play).toHaveBeenCalled();
          });

          test(`returns a promise for when the ${playerName} audio has ended`, () => {
            const theReturn = audioController.play(playerName, 'anything.mp4');
            expect(theReturn).toBeInstanceOf(Promise);
          });

          test(`returned promise resolves when the ${playerName} audio ends`, () => {
            const theReturn = audioController.play(playerName, 'anything.mp4');

            simulatePlayThroughAudio(playerName)

            return theReturn.then(returned => {
              expect(returned).toEqual(expect.anything());
            });
          });
        });

        test(`it pauses the ${playerName} audio`, () => {
          const pause = jest.fn();
          player = audioController.getPlayerNamed(playerName);
          player.pause = pause;

          audioController.pause(playerName);

          expect(pause).toHaveBeenCalled();
        });

        describe('load()', () => {
          test(`it sets the source of ${playerName} audio`, () => {
            player = audioController.getPlayerNamed(playerName);
            audioController.load(playerName, 'anything.mp4');
            expect(player.src).toMatch(/anything.mp4$/);
          });

          test(`returned promise resolves when the ${playerName} audio loads`, () => {
            player = audioController.getPlayerNamed(playerName);
            const theReturn = audioController.load(playerName, 'anything.mp4');

            simulateEventOnElement('loadeddata', player)

            return theReturn.then(returned => {
              expect(returned).toEqual(expect.anything());
            });
          });
        });

        describe('volume()', () => {
          let oldInterval;
          let dateSpy: jest.SpyInstance;
          beforeAll(() => {
            oldInterval = audioController._fadeInterval;
            audioController._fadeInterval = 1;
          })

          afterAll(() => {
            audioController._fadeInterval = oldInterval;
          })

          test(`it sets the volume of ${playerName} audio`, () => {
            player = audioController.getPlayerNamed(playerName);
            audioController.volume(playerName, 1);
            expect(player.volume).toEqual(1);
          });

          beforeEach(() => dateSpy = jest.spyOn(Date, 'now'));
          afterEach(() => {
            dateSpy.mockRestore();
            jest.useRealTimers();
          })

          test(`can adjust ${playerName} volume over time`, async () => {
            jest.useFakeTimers();
            dateSpy
              .mockReturnValueOnce(0)  
              .mockReturnValueOnce(0)  
              .mockReturnValueOnce(20)
              .mockReturnValueOnce(50)
              .mockReturnValueOnce(100)
            player = audioController.getPlayerNamed(playerName);
            player.volume = 0;

            audioController.volume(playerName, 1, 100);
            
            jest.advanceTimersByTime(20);
            jest.useRealTimers();
            await wait();
            jest.useFakeTimers();
            expect(player.volume).toBeGreaterThan(0);
            expect(player.volume).toBeLessThan(1);
            
            jest.advanceTimersByTime(30);
            jest.useRealTimers();
            await wait();
            jest.useFakeTimers();
            expect(player.volume).toBeGreaterThan(0.4);
            expect(player.volume).toBeLessThan(1);

            jest.advanceTimersByTime(50);
            jest.useRealTimers();
            await wait();
            jest.useFakeTimers();
            expect(player.volume).toEqual(1);
          });
        });
      });
    });
  });
});
