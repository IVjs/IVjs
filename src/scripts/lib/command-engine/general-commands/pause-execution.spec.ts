import { create, createMockEngine } from '../../../../test-support'
import { pauseExecutionFactory } from './pause-execution';

describe('pause execution factory', () => {
  test('it produces a valid TFO', () => {
    const tfo = pauseExecutionFactory({
      settings: create('ivSettings'),
      commandEngine: createMockEngine(),
      variables: {}
    });

    expect(tfo).toHaveProperty('pauseExecution')
    expect(typeof tfo.pauseExecution).toEqual('function')
  })

  test('it requests a pause', () => {
    const tfo = pauseExecutionFactory({
      settings: create('ivSettings'),
      commandEngine: createMockEngine(),
      variables: {}
    });

    const command: ICommand.PauseExecution = { name: 'pauseExecution' };
    const theReturn = tfo.pauseExecution(command)

    expect(theReturn).resolves.toMatchObject({requests: ['pause']});
  })

})