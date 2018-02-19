import { switchFactory, doSwitch } from './switch';
import { create, createMockEngine } from '../../../../test-support'

type TFOIn = CommandEngine.TargetFunctionFactoryInput;

describe('switch factory', () => {
  test('it produces a valid TFO', () => {
    const tfo = switchFactory({
      settings: create('ivSettings'),
      commandEngine: createMockEngine(),
      variables: {}
    });

    expect(tfo).toHaveProperty('switch')
    expect(typeof tfo.switch).toEqual('function')
  })

  test('it DOES SOMETHING...', () => {
    const variables: any = {};
    const given = { variables } as TFOIn
    const command = create('switchCommand', {
      min: 1,
      max: 100,
      assignTo: 'myRand',
    });

    doSwitch(given, command)

    expect(variables.myRand).toBeGreaterThan(0);
    expect(variables.myRand).toBeLessThan(101);
  })

})