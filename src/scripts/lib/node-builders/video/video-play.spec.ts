import { create } from '../../../../test-support/factories';
import { VideoCommandsBuilder } from './video-commands-builder';

const vcb = new VideoCommandsBuilder();

describe('playVideo()', () => {
  const playVideo = vcb.playVideo.bind(vcb);

  describe('when given a string', () => {
    test('it creates a valid playVideo command', () => {
      const expectedObject = create('playVideoCommand', {
        file: 'test.mp4',
      });

      const result = playVideo('test.mp4');

      expect(result).toEqual([expectedObject]);
    })
  })

  describe('when given an object', () => {
    test('it creates a valid playVideo command', () => {
      const expectedObject = create('playVideoCommand', {
        file: 'test.mp4',
      });

      const result = playVideo({ url: 'test.mp4'});

      expect(result).toEqual([expectedObject]);
    })
  })

  test('it can play sequentially', () => {
    const expectedObject = create('playVideoCommand', {
      file: 'test.mp4',
      onComplete: [
        create('playVideoCommand', {
          file: 'test2.mp4',
        })
      ]
    });

    const result = playVideo('test.mp4', 'test2.mp4');

    expect(result).toEqual([expectedObject]);
  })

  describe('options', () => {
    function createExpectedOnComplete(arr) {
      return create('playVideoCommand', {
        file: 'test.mp4',
        onComplete: [].concat(arr)
      })
    }

    function doWithOption(option) {
      return playVideo(
        'test.mp4',
        option,
      );
    }

    test('goTo', () => {
      const expectedObject = createExpectedOnComplete([
        create('goToNodeCommand', { nodeName: 'someNodeName' }),
        create('stopExecutionCommand'),
      ]);

      const result = doWithOption({ goTo: 'someNodeName' })

      expect(result).toEqual([expectedObject]);
    });

    test('runSync', () => {
      const expectedObject = createExpectedOnComplete([
        create('executeSyncCommand', { nodeName: 'someNodeName' })
      ]);

      const result = doWithOption({ runSync: 'someNodeName' })

      expect(result).toEqual([expectedObject]);
    });

    test('runAsync', () => {
      const expectedObject = createExpectedOnComplete([
        create('executeAsyncCommand', { nodeName: 'someNodeName' })
      ]);

      const result = doWithOption({ runAsync: 'someNodeName' })

      expect(result).toEqual([expectedObject]);
    });

    test('js', () => {
      const mock = jest.fn();
      const expectedObject = createExpectedOnComplete([
        create('executeJsCommand', { func: mock })
      ]);

      const result = doWithOption({ js: mock })

      expect(result).toEqual([expectedObject]);
    });
  });

  describe('option merging', () => {
    test('it merges options with the previous video', () => {
      const expectedObject = create('playVideoCommand', {
        file: 'test.mp4',
        onComplete: [
          create('goToNodeCommand', { nodeName: 'someNode' }),
          create('stopExecutionCommand'),
          create('playVideoCommand', {
            file: 'test2.mp4',
          })
        ]
      });

      const result = playVideo(
        'test.mp4',
        { goTo: 'someNode' },
        'test2.mp4',
      );

      expect(result).toEqual([expectedObject]);
    })

    test('it merges options with the previous object', () => {
      const expectedObject = create('playVideoCommand', {
        file: 'test.mp4',
        onComplete: [
          create('goToNodeCommand', { nodeName: 'someNode' }),
          create('stopExecutionCommand'),
          create('playVideoCommand', {
            file: 'test2.mp4',
          })
        ]
      });

      const result = playVideo(
        { url: 'test.mp4' },
        { goTo: 'someNode' },
        'test2.mp4',
      );

      expect(result).toEqual([expectedObject]);
    });

    test('it merges options in a usable order', () => {
      const expectedObject = create('playVideoCommand', {
        file: 'test.mp4',
        onComplete: [
          create('executeAsyncCommand', { nodeName: 'asyncThing'}),
          create('executeSyncCommand', { nodeName: 'syncThing'}),
          create('goToNodeCommand', { nodeName: 'someNode' }),
          create('stopExecutionCommand'),
        ]
      });

      const result = playVideo(
        'test.mp4',
        { goTo: 'someNode' },
        { runSync: 'syncThing' },
        { runAsync: 'asyncThing' },
      );

      expect(result).toEqual([expectedObject]);
    });
  });
})
