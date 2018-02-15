import { videoController } from './video-controller';
import { wait, simulateEventOnElement } from '../../../../../test-support'

function clearVideos() {
  const videos = document.querySelectorAll('video');
  qsaToArray(videos).forEach(v => v.remove());
}

function qsaToArray(qsa: any): HTMLElement[] {
  let index = 0;
  const outArray: HTMLElement[] = []
  for (index = 0; index < qsa.length; index++) {
    outArray.push(qsa[index])
  }
  return outArray;
}

function getAllVideos() {
  return qsaToArray(document.querySelectorAll('#IV-view video'));
}

function getVisibleVideos() {
  return getAllVideos().filter(v => v.style.display !== 'none');
}

function getHiddenVids() {
  return getAllVideos().filter(v => v.style.display === 'none');
}

describe('video-state', () => {
  let baseEl;
  beforeEach(() => {
    baseEl = document.getElementById('IV-view');
    clearVideos();
  })
  describe('setup', () => {
    test('it adds players to the proper element', () => {
      videoController.createPlayers(baseEl);
      expect(document.querySelectorAll('#IV-view video').length).toEqual(2)
    })
  
    test('it does not re-add players', () => {
      videoController.createPlayers(baseEl);
      videoController.createPlayers(baseEl);
      expect(getAllVideos().length).toEqual(2)
    })
  
    test('only one video is showing', () => {
      videoController.createPlayers(baseEl);
      expect(getVisibleVideos().length).toEqual(1)
    })
  })

  describe('playVideo', () => {
    beforeEach(() => {
      videoController.createPlayers(baseEl);
    })

    test('switches visible players', async () => {
      const initialVisible = getVisibleVideos()[0];
      const initialInvisible = getHiddenVids()[0];

      videoController.playVideo('anything.mp4');

      expect(initialInvisible.style.display).not.toEqual('none');
      expect(initialVisible.style.display).toEqual('none');
    });

    test('switches visible players again', () => {
      const initialVisible = getVisibleVideos()[0];
      const initialInvisible = getHiddenVids()[0];

      videoController.playVideo('anything.mp4');
      videoController.playVideo('anything-else.mp4');

      expect(initialInvisible.style.display).toEqual('none');
      expect(initialVisible.style.display).not.toEqual('none');
    });

    test('it sets the source of current video', () => {
      videoController.playVideo('anything.mp4');
      const current = videoController.getCurrentPlayer();
      expect(current.src).toEqual('anything.mp4');
    });

    test('it plays the current video', () => {
      const play = jest.fn();
      const standbyPlayer = videoController.getStandbyPlayer();
      standbyPlayer.play = play;

      videoController.playVideo('anything.mp4');

      expect(play).toHaveBeenCalled();
    });

    test('it pauses the previous video', () => {
      const pause = jest.fn();
      const currentPlayer = videoController.getCurrentPlayer();
      currentPlayer.pause = pause;

      videoController.playVideo('anything.mp4');

      expect(pause).toHaveBeenCalled();
    });

    test('returns a promise for when the video has ended', () => {
      const theReturn = videoController.playVideo('anything.mp4');
      expect(theReturn).toBeInstanceOf(Promise);
    });

    test('returned promise resolves when the video ends', () => {
      const theReturn = videoController.playVideo('anything.mp4');
      const currentPlayer = videoController.getCurrentPlayer();

      simulateEventOnElement('ended', currentPlayer);

      return theReturn.then(returned => {
        expect(returned).toEqual(expect.anything());
      })
    });
  }) 
})