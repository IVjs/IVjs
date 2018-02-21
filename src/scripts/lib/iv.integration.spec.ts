import { IV } from './iv';
import { create, wait, simulateLoadedNextVideo, simulatePlayThroughNextVideo, getCurrentVideo, getAudioPlayerNamed, getBgAudioPlayer } from '../../test-support';

describe('integration', () => {
  let iv: IV;
  beforeEach(() => iv = new IV())

  describe('.videoPlay()', () => {
    test('it plays (loads) a video', () => {
      iv.node('anything').videoPlay('test.mp4');
      iv.run('anything');

      simulateLoadedNextVideo()

      expect(getCurrentVideo().src).toEqual('test.mp4');
    })

    test('it plays videos in sequence', async () => {
      iv.node('node1').videoPlay({ url: 'test.mp4', onComplete: 'node2' });
      iv.node('node2').videoPlay('test2.mp4');


      iv.run('node1');
      simulatePlayThroughNextVideo();
      await wait();

      simulateLoadedNextVideo()

      expect(getCurrentVideo().src).toEqual('test2.mp4');
    })
  })

  describe('.setVolume()', () => {
    test('it can set volume on the BG Audio', async () => {
      iv.node('anything')
        .bgAudio({ load: 'any.mp3' })
        .setVolume({ target: 'bg', volume: 0.2 });

      iv.run('anything');
      await wait()

      expect(getBgAudioPlayer().volume).toEqual(0.2);
    })
  })

  describe('.bgAudio()', () => {
    test('loads audio', () => {
      iv.node('anything').bgAudio({ load: 'test.mp3' });
      iv.run('anything');

      expect(getAudioPlayerNamed('BG').src).toEqual('test.mp3');
    })

    test('loads initial audio', () => {
      iv.settings = {
        bgAudioUrl: 'tester.mp3',
      }
      iv.node('anything');
      iv.run('anything');

      expect(getAudioPlayerNamed('BG').src).toEqual('tester.mp3');
    })

    test('plays audio', async () => {
      const mock = jest.fn();
      iv.node('anything')
        .bgAudio({ load: 'test.mp3' })
        .bgAudio('play');

      iv.run('anything');
      getAudioPlayerNamed('BG').play = mock;
      await wait();

      expect(mock).toHaveBeenCalled();
    })

  })

  describe('.setVariable()', () => {
    let variables;
    beforeEach(() => {
      variables = {};
      iv.variables = variables;
    })

    test('it stores the variable', () => {
      iv.node('anything')
        .setVariable({ storeIn: 'name', value: 'bob' })

      iv.run('anything');

      expect(iv.variables.name).toEqual('bob')
    });

    test('it stores the variable', async () => {
      iv.node('anything')
        .setVariable({ storeIn: 'name', value: 'bob' })
        .setVariable({ var: 'name', storeIn: 'sameName' })

      iv.run('anything');
      await wait()

      expect(iv.variables.sameName).toEqual('bob')
    });
  })

  describe('.getRandom()', () => {
    let variables;
    beforeEach(() => {
      variables = {};
      iv.variables = variables;
    })

    test('it stores a random number', () => {
      iv.node('anything')
        .getRandom({ storeIn: 'myRand', min: 5, max: 10 })

      iv.run('anything');

      expect(iv.variables.myRand).toBeGreaterThan(4)
      expect(iv.variables.myRand).toBeLessThan(11)
    });
  })

  describe('.calculate()', () => {
    let variables;
    beforeEach(() => {
      variables = {};
      iv.variables = variables;
    })

    test('it adds one', async () => {
      iv.node('anything')
        .setVariable({ storeIn: 'count', value: 10 })
        .calculate({ var: 'count', add: 1, storeIn: 'count' })

      iv.run('anything');
      await wait();

      expect(iv.variables.count).toBe(11)
    });

    test('it throws with bad input', async () => {
      const setup = () => iv.node('anything')
        .setVariable({ storeIn: 'count', value: 10 })
        .calculate({ var: 'count', make: 1, storeIn: 'count' } as any);

      expect(setup).toThrow();
    });
  })

  describe('.if()', () => {
    let variables;
    beforeEach(() => {
      variables = {count: 2};
      iv.variables = variables;
    })

    test('does the first match', async () => {
      iv.node('anything')
        .if({var: 'count', is: 2})
          .setVariable({ storeIn: 'name', value: 'Bob' })
        .else()
          .setVariable({ storeIn: 'name', value: 'Jim'})
        .endIf()

      iv.run('anything');
      await wait();

      expect(iv.variables.name).toEqual('Bob')
    });

    test('does the default', async () => {
      iv.node('anything')
        .if({ var: 'count', isGreaterThan: 2 })
          .setVariable({ storeIn: 'name', value: 'Bob' })
        .else()
          .setVariable({ storeIn: 'name', value: 'Jim' })
        .endIf()

      iv.run('anything');
      await wait();

      expect(iv.variables.name).toEqual('Jim')
    });
  })

  describe('.gosub()', () => {
    let variables;
    beforeEach(() => {
      variables = { count: 0 };
      iv.variables = variables;
    })

    test('pauses execution and resumes when other node completes', async () => {
      iv.node('anything')
        .setVariable({ storeIn: 'count', value: 0 })
        .calculate({ storeIn: 'count', var: 'count', add: 1 })
        .goSub('second')
        .calculate({ storeIn: 'count', var: 'count', add: 1 })

      iv.node('second')
        .calculate({ storeIn: 'count', var: 'count', add: 1 })
        .wait(0.010)

      iv.run('anything');

      await wait(5);
      expect(iv.variables.count).toEqual(2)
      await wait(6);
      expect(iv.variables.count).toEqual(3)
    });
  })

  describe('.wait()', () => {
    let variables;
    beforeEach(() => {
      variables = { count: 0 };
      iv.variables = variables;
    })

    test('waits and resumes when timeout ends', async () => {
      iv.node('anything')
        .setVariable({ storeIn: 'count', value: 0 })
        .calculate({ storeIn: 'count', var: 'count', add: 1 })
        .wait(0.010)
        .calculate({ storeIn: 'count', var: 'count', add: 1 })

      iv.run('anything');

      await wait(9);
      expect(iv.variables.count).toEqual(1)
      await wait(2);
      expect(iv.variables.count).toEqual(2)
    });
  })

  describe('.execute()', () => {
    let variables;
    beforeEach(() => {
      variables = { started: 0, ended: 0 };
      iv.variables = variables;
    })

    test('runs a node without waiting', async () => {
      iv.node('first')
        .calculate({ storeIn: 'started', var: 'started', add: 1 })
        .execute('second')
        .calculate({ storeIn: 'ended', var: 'ended', add: 1 })

      iv.node('second')
        .calculate({ storeIn: 'started', var: 'started', add: 1 })
        .wait(0.01)
        .calculate({ storeIn: 'ended', var: 'ended', add: 1 })

      iv.run('first');

      await wait(5);
      expect(iv.variables.started).toEqual(2)
      expect(iv.variables.ended).toEqual(1)
    });
  })

})
