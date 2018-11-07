import { getAudioPlayerNamed,
  getBgAudioPlayer,
  getCurrentVideo,
  querySelectorAll,
  simulateEventOnElement,
  simulateLoadedNextVideo,
  simulatePlayThroughNextVideo,
  wait,
} from '../test-support';
import { IV } from './iv';

function getButtons() {
  return querySelectorAll('button')
}

function btnOptions(overrides = {}) {
  return {
    id: 'myBtn',
    js: jest.fn(),
    text: 'My Button', ...overrides};
}

describe('integration', () => {
  let iv: IV;
  beforeEach(() => {
    iv = new IV()
    iv.variables = {
      count: 0
    }
  })

  describe('.playVideo()', () => {
    test('it plays (loads) a video', () => {
      iv.node('anything').playVideo('test.mp4');
      iv.run('anything');

      simulateLoadedNextVideo()

      expect(getCurrentVideo().src).toMatch(/test.mp4$/);
    })

    test('it plays videos in sequence', async () => {
      iv.node('node1').playVideo({ url: 'test.mp4', goTo: 'node2' });
      iv.node('node2').playVideo('test2.mp4');


      iv.run('node1');
      simulatePlayThroughNextVideo();
      await wait();

      simulateLoadedNextVideo()

      expect(getCurrentVideo().src).toMatch(/test2.mp4$/);
    })

    test('it runs a js command if supplied', async () => {
      const mock = jest.fn();
      iv.node('node1').playVideo({ url: 'test.mp4', js: mock });

      iv.run('node1');
      simulatePlayThroughNextVideo();
      await wait();

      expect(mock).toHaveBeenCalled();
    })
  })

  describe('.clearVideo()', () => {
    test('it does not blow up (remove this test when actual functionality is tested)', async () => {
      iv.node('anything')
        .playVideo('test.mp4')
        .clearVideo();
        
      iv.run('anything');
      simulatePlayThroughNextVideo()
      await wait();

      expect(true).toBe(true);
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

    test.skip('it can set volume on the BG Audio over time', async () => {
      // This test is unreliable...
      iv.node('anything')
        .setVolume({ target: 'bg', volume: 0})
        .setVolume({ target: 'bg', volume: 1, time: 0.5})

      iv.run('anything');

      await wait(203)
      expect(getBgAudioPlayer().volume).toBeGreaterThan(0);
      expect(getBgAudioPlayer().volume).toBeLessThan(1);

      await wait(201)
      expect(getBgAudioPlayer().volume).toBeGreaterThan(0.4);
      expect(getBgAudioPlayer().volume).toBeLessThan(1);

      await wait(201)
      expect(getBgAudioPlayer().volume).toEqual(1);
    })
  })

  describe('.bgAudio()', () => {
    test('loads audio', () => {
      iv.node('anything').bgAudio({ load: 'test.mp3' });
      iv.run('anything');

      expect(getAudioPlayerNamed('BG').src).toMatch(/test.mp3$/);
    })

    test('loops by default', () => {
      iv.node('anything').bgAudio({ load: 'test.mp3' });
      iv.run('anything');

      expect(getAudioPlayerNamed('BG').loop).toEqual(true);
    })

    test('settings override loop default', async () => {
      iv.settings.bgAudioLoop = false;
      iv.node('anything').bgAudio({ load: 'test.mp3' });
      iv.run('anything');

      await wait();

      expect(getAudioPlayerNamed('BG').loop).toEqual(false);
    })

    test('loads initial audio', () => {
      iv.settings = {
        bgAudioUrl: 'tester.mp3',
      }
      iv.node('anything');
      iv.run('anything');

      expect(getAudioPlayerNamed('BG').src).toMatch(/tester.mp3$/);
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

  describe('.js()', () => {
    let variables;
    beforeEach(() => {
      variables = {};
      iv.variables = variables;
    })

    test('it runs the passed function', () => {
      const spy = jest.fn();
      iv.node('anything')
        .js(spy)

      iv.run('anything');

      expect(spy).toHaveBeenCalled();
    });

    test('it is still chainable', async () => {
      const spy = jest.fn();
      const spy2 = jest.fn();
      iv.node('anything')
        .js(spy)
        .js(spy2)

      iv.run('anything');

      await wait();

      expect(spy).toHaveBeenCalled();
      expect(spy2).toHaveBeenCalled();
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

  describe('.addButton()', () => {

    async function addButtonWithSettings(settings) {
      iv.node('first')
        .addButton(settings)

      iv.node('second')
        .calculate({ storeIn: 'count', var: 'count', add: 1 })

      iv.run('first');

      await wait();
    }

    test('adds a button to the page', async () => {
      await addButtonWithSettings(btnOptions())
      expect(querySelectorAll('button')).toHaveLength(1);
    });

    test('the button fires js when clicked', async () => {
      const settings = btnOptions();
      await addButtonWithSettings(settings)

      simulateEventOnElement('click', getButtons()[0])

      expect(settings.js).toHaveBeenCalled();
    });

    test('the button can be removed when clicked', async () => {
      const settings = btnOptions({remove: true});
      await addButtonWithSettings(settings)

      simulateEventOnElement('click', getButtons()[0])

      await wait();
      expect(getButtons()).toHaveLength(0);
    });

  });

  describe('removeAllButtons()', () => {
    test('removes all buttons', async () => {
      iv.node('any')
        .addButton(btnOptions({id: '1'}))
        .addButton(btnOptions({id: '2'}))
        .addButton(btnOptions({id: '3'}))
        .removeAllButtons()

      iv.run('any');

      await wait();

      expect(getButtons()).toHaveLength(0);
    });
  });

  describe('run()', () => {
    let variables;
    beforeEach(() => {
      variables = { count: 0, };
      iv.variables = variables;
    })

    test('runs a node by name', async () => {
      iv.node('run me')
        .calculate({ storeIn: 'count', var: 'count', add: 1 })

      iv.node('do not run')
        .calculate({ storeIn: 'count', var: 'count', add: 100 })

      iv.run('run me');

      // await wait(5);
      expect(iv.variables.count).toEqual(1)
    });

    test('runs first node when no name is given', async () => {
      iv.node('run me')
        .calculate({ storeIn: 'count', var: 'count', add: 1 })

      iv.node('do not run')
        .calculate({ storeIn: 'count', var: 'count', add: 100 })

      iv.run();

      // await wait(5);
      expect(iv.variables.count).toEqual(1)
    });

    test('runs a node by name, even if not the first registered', async () => {
      iv.node('not me')
        .calculate({ storeIn: 'count', var: 'count', add: 1 })

      iv.node('run me')
        .calculate({ storeIn: 'count', var: 'count', add: 100 })

      iv.run('run me');

      // await wait(5);
      expect(iv.variables.count).toEqual(100)
    });

    test('on mobile it runs a node by name, even if not the first registered', async () => {
      iv.node('not me')
        .calculate({ storeIn: 'count', var: 'count', add: 1 })
      iv.node('run me')
        .calculate({ storeIn: 'count', var: 'count', add: 100 })
      // @ts-ignore
      jest.spyOn(iv, 'isMobileOrTablet').mockImplementation(() => true)

      iv.run('run me');
      simulateEventOnElement('click', document.querySelector('button'))

      expect(iv.variables.count).toEqual(100)
    });
  });

  describe('createRunButton()', () => {
    let variables;
    beforeEach(() => {
      variables = { count: 0, };
      iv.variables = variables;
    })

    test('runs a node by name', async () => {
      iv.node('run me')
        .calculate({ storeIn: 'count', var: 'count', add: 1 })

      iv.node('do not run')
        .calculate({ storeIn: 'count', var: 'count', add: 100 })

      const btn = iv.createRunButton('btn name', 'run me');
      simulateEventOnElement('click', btn)

      expect(iv.variables.count).toEqual(1)
    });

    test('runs first node when no name is given', async () => {
      iv.node('run me')
        .calculate({ storeIn: 'count', var: 'count', add: 1 })

      iv.node('do not run')
        .calculate({ storeIn: 'count', var: 'count', add: 100 })

      const btn = iv.createRunButton('btn name');
      simulateEventOnElement('click', btn)

      expect(iv.variables.count).toEqual(1)
    });

    test('runs a node by name, even if not the first registered', async () => {
      iv.node('not me')
        .calculate({ storeIn: 'count', var: 'count', add: 1 })

      iv.node('run me')
        .calculate({ storeIn: 'count', var: 'count', add: 100 })

      const btn = iv.createRunButton('btn name', 'run me');
      simulateEventOnElement('click', btn)
  
      expect(iv.variables.count).toEqual(100)
    });
  });
})
