import { assignVariableFactory } from './assign-variable';
import { create, createMockEngine } from '../../../../test-support'

describe('go-to-node-factory', () => {
  test('it produces a valid TFO', () => {
    const tfo = assignVariableFactory({
      settings: create('ivSettings'),
      commandEngine: createMockEngine(),
      variables: {}
    });

    expect(tfo).toHaveProperty('assignVariable')
    expect(typeof tfo.assignVariable).toEqual('function')
  })

  test('it sets a variable', () => {
    const variables: any = {};
    const tfo = assignVariableFactory({
      settings: create('ivSettings'),
      commandEngine: createMockEngine(),
      variables
    });

    const command: ICommand.AssignVariable = { name: 'assignVariable', value: 'Bob', assignTo: 'name' };
    tfo.assignVariable(command)

    expect(variables.name).toEqual('Bob');
  })

})