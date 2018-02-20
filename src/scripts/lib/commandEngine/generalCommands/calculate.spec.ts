import { calculateFactory, doCalculate } from './calculate';
import { create, createMockEngine } from '../../../../test-support'

function createSimpleCalculateInput({ operator, startingValue, operand }) {
  const given = create('targetFunctionFactoryInput', { variables: { myVar: startingValue } });
  const swCmd = create('calculateCommand', {
    varName: 'myVar',
    operation: operator,
    value: operand,
    assignTo: 'changedVar',
  });

  return { given, command: swCmd, changedVar: () => given.variables.changedVar };
}

describe('calculate factory', () => {
  test('it produces a valid TFO', () => {
    const tfo = calculateFactory({
      settings: create('ivSettings'),
      commandEngine: createMockEngine(),
      variables: {}
    });

    expect(tfo).toHaveProperty('calculate')
    expect(typeof tfo.calculate).toEqual('function')
  })

  describe('operators: add', () => {
    test('adds to given value', () => {
      const sw = createSimpleCalculateInput({
        startingValue: 12,
        operator: 'add',
        operand: 12,
      })

      doCalculate(sw.given, sw.command)

      expect(sw.changedVar()).toEqual(24);
    })
  });

  describe('operators: subtract', () => {
    test('subtracts from given value', () => {
      const sw = createSimpleCalculateInput({
        startingValue: 12,
        operator: 'subtract',
        operand: 11,
      })

      doCalculate(sw.given, sw.command)

      expect(sw.changedVar()).toEqual(1);
    })
  });
});
