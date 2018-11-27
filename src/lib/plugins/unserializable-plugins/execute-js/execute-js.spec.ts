import { create, createMockEngine, createMockRunner, wait } from '../../../../test-support';
import { executeJsFactory } from './execute-js';

describe('wait factory', () => {
  test('it produces a valid TFO', () => {
    const tfo = executeJsFactory({
      settings: create('ivSettings'),
      commandEngine: createMockEngine(),
      variables: {},
    });

    expect(tfo).toHaveProperty('executeJs');
    expect(typeof tfo.executeJs).toEqual('function');
  });

  describe('when the given function returns a non-promise', () => {
    test('it returns after one cycle', async () => {
      const tfo = executeJsFactory({
        settings: create('ivSettings'),
        commandEngine: createMockEngine(),
        variables: {},
      });

      const command = create('executeJsCommand', {
        func: () => {}, // tslint:disable-line
      });
      const theReturn = tfo.executeJs(command);
      let returnFired = false;
      theReturn.then(() => (returnFired = true));

      await wait();
      expect(returnFired).toEqual(true);
    });
  });

  describe('when the given function returns a promise', () => {
    test('it returns after the promise resolves', async () => {
      const tfo = executeJsFactory({
        settings: create('ivSettings'),
        commandEngine: createMockEngine(),
        variables: {},
      });

      const command = create('executeJsCommand', {
        func: () => wait(5),
      });
      const theReturn = tfo.executeJs(command);
      let returnFired = false;
      theReturn.then(() => (returnFired = true));

      await wait();
      expect(returnFired).toEqual(false);
      await wait(5);
      expect(returnFired).toEqual(true);
    });
  });
});
