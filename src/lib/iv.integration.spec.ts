import {
  simulateEventOnElement,
  wait,
} from '../test-support';
import { IV } from './iv';
import { PluginRegistration } from './base-iv';

describe('integration', () => {
  let iv: IV;
  beforeEach(() => {
    iv = new IV();
    iv.variables = {};
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
      apiExtension: { first: spy1 },
    };
    const plugin2: PluginRegistration = {
      apiExtension: {second: spy2 },
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
      apiExtension: { first: spy1 },
    };
    const plugin2: PluginRegistration = {
      apiExtension: { second: spy2 },
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
      apiExtension: { first: spy1 },
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
      apiExtension: { first: spy1 },
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
