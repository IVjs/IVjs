import { videoPlayFactory } from './play-video';
import { create, simulateEventOnElement, createMockEngine } from '../../../../../test-support'
import { videoController } from './video-controller';

describe('video-play-factory', () => {
  test('it produces a valid TFO', () => {
    const tfo = videoPlayFactory({
      settings: create('ivSettings'),
      commandEngine: createMockEngine(),
      variables: {}
    });

    expect(tfo).toHaveProperty('playVideo')
    expect(typeof tfo.playVideo).toEqual('function')
  })

  test('it creates players in the DOM', () => {
    const tfo = videoPlayFactory({
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

    const tfo = videoPlayFactory({
      settings: create('ivSettings', { baseVideoUrl: 'http://youtube.com/' }),
      commandEngine: createMockEngine(),
      variables: {}
    });

    tfo.playVideo({ file: 'something.mp4', name: 'playVideo' })

    expect(mock).toHaveBeenCalledWith('http://youtube.com/something.mp4');
    videoController.playVideo = oldPlay;
  });

  test('it passes async commands out on end', () => {
    const tfo = videoPlayFactory({
      settings: create('ivSettings'),
      commandEngine: createMockEngine(),
      variables: {}
    });

    const theReturn = tfo.playVideo({ file: 'something.mp4', name: 'playVideo', onComplete: [{name: 'anyCommand'}] })

    simulateEventOnElement('ended', videoController.getCurrentPlayer())

    const eventualCommands = theReturn.then(ret => ret.asyncCommands);

    return eventualCommands.then(commands => {
      expect(commands).toEqual([{name: 'anyCommand'}])
    })
  });
})
