import { playVideoFactory } from './play-video';
import { videoController } from './video-controller';
import { create, createMockEngine, simulatePlayThroughNextVideo } from '../../../../../test-support'

describe('play-video-factory', () => {
  test('it produces a valid TFO', () => {
    const tfo = playVideoFactory({
      settings: create('ivSettings'),
      commandEngine: createMockEngine(),
      variables: {}
    });

    expect(tfo).toHaveProperty('playVideo')
    expect(typeof tfo.playVideo).toEqual('function')
  })

  test('it creates players in the DOM', () => {
    const tfo = playVideoFactory({
      settings: create('ivSettings'),
      commandEngine: createMockEngine(),
      variables: {}
    });

    expect(document.querySelectorAll('video').length).toEqual(2);
  })

  test('it appends a baseurl to videos', () => {
    const oldPlay = videoController.playVideo;
    const mock = jest.fn();
    videoController.playVideo = mock;

    const tfo = playVideoFactory({
      settings: create('ivSettings', { baseVideoUrl: 'http://youtube.com/' }),
      commandEngine: createMockEngine(),
      variables: {}
    });

    tfo.playVideo({ file: 'something.mp4', name: 'playVideo' })

    expect(mock).toHaveBeenCalledWith('http://youtube.com/something.mp4');
    videoController.playVideo = oldPlay;
  });

  test('it passes async commands out on end', () => {
    const tfo = playVideoFactory({
      settings: create('ivSettings'),
      commandEngine: createMockEngine(),
      variables: {}
    });

    const theReturn = tfo.playVideo({ file: 'something.mp4', name: 'playVideo', onComplete: [{name: 'anyCommand'}] })

    simulatePlayThroughNextVideo()

    const eventualCommands = theReturn.then(ret => ret.asyncCommands);

    return eventualCommands.then(commands => {
      expect(commands).toEqual([{name: 'anyCommand'}])
    })
  });
})
