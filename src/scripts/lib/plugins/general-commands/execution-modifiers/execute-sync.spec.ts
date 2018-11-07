import { create, createMockEngine, createMockRunner, wait } from '../../../../../test-support'
import { executeSyncFactory } from './execute-sync';

describe('execute sync factory', () => {
  test('it produces a valid TFO', () => {
    const tfo = executeSyncFactory({
      settings: create('ivSettings'),
      commandEngine: createMockEngine(),
      variables: {}
    });

    expect(tfo).toHaveProperty('executeSync')
    expect(typeof tfo.executeSync).toEqual('function')
  })

  test('it starts another node', () => {
    const mock = createMockEngine();
    const tfo = executeSyncFactory({
      settings: create('ivSettings'),
      commandEngine: mock,
      variables: {}
    });

    const command: ICommand.ExecuteSync = create('executeSyncCommand', { nodeName: 'someNode' });
    const theReturn = tfo.executeSync(command)

    expect(mock.runNodeByName).toHaveBeenCalledWith('someNode');
  })

  test('it only returns after the other node finishes', async () => {
    const mock = createMockEngine();
    const runnerMock = createMockRunner();
    mock.runNodeByName = jest.fn(() => runnerMock)
    runnerMock.once = jest.fn(async (_, cb) => {await wait(10); cb()});

    const tfo = executeSyncFactory({
      settings: create('ivSettings'),
      commandEngine: mock,
      variables: {}
    });

    const command: ICommand.ExecuteSync = create('executeSyncCommand', { nodeName: 'someNode' });
    const theReturn = tfo.executeSync(command)
    let returnFired = false;
    theReturn.then(() => returnFired = true);

    await wait(5);
    expect(returnFired).toEqual(false);
    await wait(5);
    expect(returnFired).toEqual(true);
  })

})