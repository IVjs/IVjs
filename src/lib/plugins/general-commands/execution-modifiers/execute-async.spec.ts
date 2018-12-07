import { create, createMockEngine, createMockRunner, wait } from '../../../../test-support';
import { executeAsyncFactory } from './execute-async';

describe('execute async factory', () => {
  test('it produces a valid TFO', () => {
    const tfo = executeAsyncFactory({
      settings: create('ivSettings'),
      commandEngine: createMockEngine(),
      variables: {},
    });

    expect(tfo).toHaveProperty('executeAsync');
    expect(typeof tfo.executeAsync).toEqual('function');
  });

  test('it starts another node', () => {
    const mock = createMockEngine();
    const spy = jest.spyOn(mock, 'runNodeByName');
    const tfo = executeAsyncFactory({
      settings: create('ivSettings'),
      commandEngine: mock,
      variables: {},
    });

    const command: ICommand.ExecuteAsync = create('executeAsyncCommand', { nodeName: 'someNode' });
    const theReturn = tfo.executeAsync(command);

    expect(spy).toHaveBeenCalledWith('someNode');
  });

  test('it returns immediately', async () => {
    const mock = createMockEngine();
    const tfo = executeAsyncFactory({
      settings: create('ivSettings'),
      commandEngine: mock,
      variables: {},
    });

    const command: ICommand.ExecuteAsync = create('executeAsyncCommand', { nodeName: 'someNode' });
    const theReturn = tfo.executeAsync(command);
    let returnFired = false;
    theReturn.then(() => (returnFired = true));

    await wait();
    expect(returnFired).toEqual(true);
  });
});
