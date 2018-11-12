import { getAudioPlayerNamed,
  getBgAudioPlayer,
  querySelectorAll,
  simulateEventOnElement,
  wait,
} from '../test-support';
import { IV } from './iv';
import { PluginRegistration } from './base-iv';

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
    iv = new IV();
    iv.variables = {};
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
    test('it stores a random number', () => {
      iv.node('anything')
        .getRandom({ storeIn: 'myRand', min: 5, max: 10 })

      iv.run('anything');

      expect(iv.variables.myRand).toBeGreaterThan(4)
      expect(iv.variables.myRand).toBeLessThan(11)
    });
  })

  describe('.js()', () => {
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

  describe('.if()', () => {
    beforeEach(() => {
      iv.variables = { count: 2 };
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
    beforeEach(() => {
      iv.variables = { count: 0 };
    })

    test('pauses execution and resumes when other node completes', async () => {
      iv.node('anything')
        .calculate({var: 'count', add: 1 })
        .goSub('second')
        .calculate({var: 'count', add: 1 })

      iv.node('second')
        .calculate({var: 'count', add: 1 })
        .wait(0.010)

      iv.run('anything');

      await wait(5);
      expect(iv.variables.count).toEqual(2)
      await wait(6);
      expect(iv.variables.count).toEqual(3)
    });
  })

  describe('.wait()', () => {
    beforeEach(() => {
      iv.variables = { count: 0 };
    })

    test('waits and resumes when timeout ends', async () => {
      iv.node('anything')
        .calculate({var: 'count', add: 1 })
        .wait(0.010)
        .calculate({var: 'count', add: 1 })

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
        .calculate({ var: 'started', add: 1 })
        .execute('second')
        .calculate({ var: 'ended', add: 1 })

      iv.node('second')
        .calculate({ var: 'started', add: 1 })
        .wait(0.01)
        .calculate({ var: 'ended', add: 1 })

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
        .calculate({var: 'count', add: 1 })

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
    beforeEach(() => {
      iv.variables = { count: 0 };
    })

    test('runs a node by name', async () => {
      iv.node('run me')
        .calculate({var: 'count', add: 1 })

      iv.node('do not run')
        .calculate({var: 'count', add: 100 })

      iv.run('run me');

      // await wait(5);
      expect(iv.variables.count).toEqual(1)
    });

    test('runs first node when no name is given', async () => {
      iv.node('run me')
        .calculate({var: 'count', add: 1 })

      iv.node('do not run')
        .calculate({var: 'count', add: 100 })

      iv.run();

      // await wait(5);
      expect(iv.variables.count).toEqual(1)
    });

    test('runs a node by name, even if not the first registered', async () => {
      iv.node('not me')
        .calculate({var: 'count', add: 1 })

      iv.node('run me')
        .calculate({var: 'count', add: 100 })

      iv.run('run me');

      // await wait(5);
      expect(iv.variables.count).toEqual(100)
    });

    test('on mobile it runs a node by name, even if not the first registered', async () => {
      iv.node('not me')
        .calculate({var: 'count', add: 1 })
      iv.node('run me')
        .calculate({var: 'count', add: 100 })
      // @ts-ignore
      jest.spyOn(iv, 'isMobileOrTablet').mockImplementation(() => true)

      iv.run('run me');
      simulateEventOnElement('click', document.querySelector('button'))

      expect(iv.variables.count).toEqual(100)
    });
  });

  describe('createRunButton()', () => {
    beforeEach(() => {
      iv.variables = { count: 0 };
    })

    test('runs a node by name', async () => {
      iv.node('run me')
        .calculate({var: 'count', add: 1 })

      iv.node('do not run')
        .calculate({var: 'count', add: 100 })

      const btn = iv.createRunButton('btn name', 'run me');
      simulateEventOnElement('click', btn)

      expect(iv.variables.count).toEqual(1)
    });

    test('runs first node when no name is given', async () => {
      iv.node('run me')
        .calculate({var: 'count', add: 1 })

      iv.node('do not run')
        .calculate({var: 'count', add: 100 })

      const btn = iv.createRunButton('btn name');
      simulateEventOnElement('click', btn)

      expect(iv.variables.count).toEqual(1)
    });

    test('runs a node by name, even if not the first registered', async () => {
      iv.node('not me')
        .calculate({var: 'count', add: 1 })

      iv.node('run me')
        .calculate({var: 'count', add: 100 })

      const btn = iv.createRunButton('btn name', 'run me');
      simulateEventOnElement('click', btn)
  
      expect(iv.variables.count).toEqual(100)
    });
  });
})

describe('Extending', () => {
  it('can extend multiple times', () => {
    const spy1 = jest.fn(() => { /* no op */ });
    const spy2 = jest.fn(() => { /* no op */ });
    const plugin1: PluginRegistration = {
      apiExtensions: [{
        apiName: 'first',
        apiFn: spy1,
      }],
    };
    const plugin2: PluginRegistration = {
      apiExtensions: [{
        apiName: 'second',
        apiFn: spy2,
      }],
    };

    const hasPlugin1 = IV.extend(plugin1);
    const hasPlugin1And2 = hasPlugin1.extend(plugin2);
    const my1 = new hasPlugin1();
    const my2 = new hasPlugin1And2();

    // @ts-ignore
    expect(() => my1.node('one').first()).not.toThrow();
    // @ts-ignore
    expect(() => my2.node('two').second()).not.toThrow();

    // And here's the real test:
    // @ts-ignore
    expect(() => my2.node('one and two').first()).not.toThrow();
  });

  it('each extension is separate', () => {
    const spy1 = jest.fn(() => { /* no op */ });
    const spy2 = jest.fn(() => { /* no op */ });
    const plugin1: PluginRegistration = {
      apiExtensions: [{
        apiName: 'first',
        apiFn: spy1,
      }],
    };
    const plugin2: PluginRegistration = {
      apiExtensions: [{
        apiName: 'second',
        apiFn: spy2,
      }],
    };

    const hasPlugin1 = IV.extend(plugin1);
    const hasPlugin2 = IV.extend(plugin2);
    const my1 = new hasPlugin1();
    const my2 = new hasPlugin2();

    // @ts-ignore
    expect(() => my1.node('one').first()).not.toThrow();
    // @ts-ignore
    expect(() => my2.node('two').second()).not.toThrow();

    // And here's the real test:
    // @ts-ignore
    expect(() => my2.node('should not work').first()).toThrow();
  });
});

describe('Aliasing', () => {
  it('can alias one function to another name', () => {
    const spy1 = jest.fn(() => { /* no op */ });
    const plugin1: PluginRegistration = {
      apiExtensions: [{
        apiName: 'first',
        apiFn: spy1,
      }],
    };
    const plugin2: PluginRegistration = {
      aliases: [
        { target: 'first', aliasAs: 'second' }
      ]
    };

    const hasPlugin1 = IV.extend(plugin1, plugin2);
    const my1 = new hasPlugin1();

    // @ts-ignore
    expect(() => my1.node('one').first()).not.toThrow();
    // @ts-ignore
    expect(() => my1.node('one').second()).not.toThrow();
    expect(spy1).toHaveBeenCalledTimes(2);
  });

  it('can alias one function to several other names', () => {
    const spy1 = jest.fn(() => { /* no op */ });
    const plugin1: PluginRegistration = {
      apiExtensions: [{
        apiName: 'first',
        apiFn: spy1,
      }],
    };
    const plugin2: PluginRegistration = {
      aliases: [
        { target: 'first', aliasAs: ['second', 'third', 'fourth'] }
      ]
    };

    const hasPlugin1 = IV.extend(plugin1, plugin2);
    const my1 = new hasPlugin1();

    // @ts-ignore
    expect(() => my1.node('one').first()).not.toThrow();
    // @ts-ignore
    expect(() => my1.node('one').second()).not.toThrow();
    // @ts-ignore
    expect(() => my1.node('one').third()).not.toThrow();
    // @ts-ignore
    expect(() => my1.node('one').fourth()).not.toThrow();
    expect(spy1).toHaveBeenCalledTimes(4);
  });
});
