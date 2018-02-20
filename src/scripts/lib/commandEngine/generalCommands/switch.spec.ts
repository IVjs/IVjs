import { switchFactory, doSwitch } from './switch';
import { create, createMockEngine } from '../../../../test-support'

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

  describe('operators: is', () => {
    test('returns commands for IS when var is equal', () => {
      const given = create('targetFunctionFactoryInput', { variables: {myVar: 12} });
      const shouldReturn = create('targetCommand');
      const shouldNotReturn = create('waitCommand');
      const swCmd = create('switchCommand', {
        do: [{
          varName: 'myVar',
          is: 12,
          commands: [shouldReturn]
        }],
        defaultCommands: [shouldNotReturn]
      });
  
      const returned = doSwitch(given, swCmd)
  
      expect(returned.commands).toEqual([shouldReturn]);
    })
  });

})