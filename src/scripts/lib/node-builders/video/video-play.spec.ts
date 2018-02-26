import { IV } from '../../iv';
import { create } from '../../../../test-support/factories';

describe('playVideo()', () => {
  let iv;
  beforeEach(() => iv = new IV())

  describe('when given a string', () => {
    test('it creates a valid playVideo command', () => {
      const expectedObject = create('playVideoCommand', {
        file: 'test.mp4',
      });

      iv.node('anything').playVideo('test.mp4');

      expect(iv.nodes[0].commands).toEqual([expectedObject]);
    })
  })

  describe('when given an object', () => {
    test('it creates a valid playVideo command', () => {
      const expectedObject = create('playVideoCommand', {
        file: 'test.mp4',
      });

      iv.node('anything').playVideo({ url: 'test.mp4'});

      expect(iv.nodes[0].commands).toEqual([expectedObject]);
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

    iv.node('anything').playVideo('test.mp4', 'test2.mp4');

    expect(iv.nodes[0].commands).toEqual([expectedObject]);
  })

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

      iv.node('anything').playVideo(
        'test.mp4',
        { goTo: 'someNode' },
        'test2.mp4',
      );

      expect(iv.nodes[0].commands).toEqual([expectedObject]);
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

      iv.node('anything').playVideo(
        { url: 'test.mp4' },
        { goTo: 'someNode' },
        'test2.mp4',
      );

      expect(iv.nodes[0].commands).toEqual([expectedObject]);
    });
  });
})
