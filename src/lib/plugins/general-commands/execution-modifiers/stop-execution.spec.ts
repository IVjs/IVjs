import { create, createMockEngine, simulateEventOnElement } from '../../../../test-support';
import { stopExecutionFactory } from './execution-requests';

describe('stop execution factory', () => {
  test('it produces a valid TFO', () => {
    const tfo = stopExecutionFactory({
      settings: create('ivSettings'),
      commandEngine: createMockEngine(),
      variables: {},
    });

    expect(tfo).toHaveProperty('stopExecution');
    expect(typeof tfo.stopExecution).toEqual('function');
  });

  test('it requests an exit', () => {
    const tfo = stopExecutionFactory({
      settings: create('ivSettings'),
      commandEngine: createMockEngine(),
      variables: {},
    });

    const command: ICommand.StopExecution = { name: 'stopExecution' };
    const theReturn = tfo.stopExecution(command);

    expect(theReturn).resolves.toMatchObject({ requests: ['exit'] });
  });
});
