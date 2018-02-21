import { stopExecutionFactory } from './stop-execution';
import { create, simulateEventOnElement, createMockEngine } from '../../../../test-support'

describe('stop execution factory', () => {
  test('it produces a valid TFO', () => {
    const tfo = stopExecutionFactory({
      settings: create('ivSettings'),
      commandEngine: createMockEngine(),
      variables: {}
    });

    expect(tfo).toHaveProperty('stopExecution')
    expect(typeof tfo.stopExecution).toEqual('function')
  })

  test('it requests an exit', () => {
    const tfo = stopExecutionFactory({
      settings: create('ivSettings'),
      commandEngine: createMockEngine(),
      variables: {}
    });

    const command: ICommand.StopExecution = { name: 'stopExecution' };
    const theReturn = tfo.stopExecution(command)

    expect(theReturn).resolves.toMatchObject({requests: ['exit']});
  })

})