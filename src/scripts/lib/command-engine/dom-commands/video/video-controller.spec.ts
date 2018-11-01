import { getAllVideos, simulateLoadedNextVideo, simulatePlayThroughNextVideo, wait } from '../../../../../test-support'
import { defaults } from '../../../config'
import { videoController } from './video-controller';

describe('video-controller', () => {
  let baseEl;
  beforeEach(() => {
    baseEl = document.getElementById(defaults.baseElementId);
  })
  describe('setup', () => {
    test('it adds players to the proper element', () => {
      videoController.createPlayers(baseEl);
      expect(document.querySelectorAll(`#${defaults.baseElementId} video`).length).toEqual(2)
    })

    test('it does not re-add players', () => {
      videoController.createPlayers(baseEl);
      videoController.createPlayers(baseEl);
      expect(getAllVideos().length).toEqual(2)
    })
  })

  describe('playVideo', () => {
    beforeEach(() => {
      videoController.createPlayers(baseEl);
    })

    test('it sets the source of current video', () => {
      videoController.playVideo('anything.mp4');
      const current = videoController.getCurrentPlayer();

      simulateLoadedNextVideo();

      expect(current.src).toMatch(/anything.mp4$/);
    });

    test('it plays the current video', () => {
      const play = jest.fn();
      const standbyPlayer = videoController.getCurrentPlayer();
      standbyPlayer.play = play;

      videoController.playVideo('anything.mp4');
      simulateLoadedNextVideo()

      expect(play).toHaveBeenCalled();
    });

    test('returns a promise for when the video has ended', () => {
      const theReturn = videoController.playVideo('anything.mp4');
      expect(theReturn).toBeInstanceOf(Promise);
    });

    test('returned promise resolves when the video ends', () => {
      const theReturn = videoController.playVideo('anything.mp4');

      simulatePlayThroughNextVideo()

      return theReturn.then(returned => {
        expect(returned).toEqual(expect.anything());
      })
    });
  })
})
