import { create, createMockEngine } from '../../../../test-support'
import { calculateFactory, doCalculate } from './calculate';

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

  describe('operators: multiply', () => {
    test('multiplies a given value', () => {
      const sw = createSimpleCalculateInput({
        startingValue: 8,
        operator: 'multiply',
        operand: 8,
      })

      doCalculate(sw.given, sw.command)

      expect(sw.changedVar()).toEqual(64);
    })
  });

  describe('operators: divide', () => {
    test('divides given value', () => {
      const sw = createSimpleCalculateInput({
        startingValue: 64,
        operator: 'divide',
        operand: 8,
      })

      doCalculate(sw.given, sw.command)

      expect(sw.changedVar()).toEqual(8);
    })
  });

  describe('operators: divideThenRemainder', () => {
    test('divides given value and returns the remainder', () => {
      const sw = createSimpleCalculateInput({
        startingValue: 12,
        operator: 'divideThenRemainder',
        operand: 7,
      })

      doCalculate(sw.given, sw.command)

      expect(sw.changedVar()).toEqual(5);
    })
  });

  describe('operators: divideThenRoundUp', () => {
    test('divides given value and rounds up', () => {
      const sw = createSimpleCalculateInput({
        startingValue: 12,
        operator: 'divideThenRoundUp',
        operand: 7,
      })

      doCalculate(sw.given, sw.command)

      expect(sw.changedVar()).toEqual(2);
    })
  });

  describe('operators: divideThenRoundDown', () => {
    test('divides given value and rounds down', () => {
      const sw = createSimpleCalculateInput({
        startingValue: 12,
        operator: 'divideThenRoundDown',
        operand: 7,
      })

      doCalculate(sw.given, sw.command)

      expect(sw.changedVar()).toEqual(1);
    })
  });

  describe('operators: divideThenRound', () => {
    test('rounds up at 0.5', () => {
      const sw = createSimpleCalculateInput({
        startingValue: 1,
        operator: 'divideThenRound',
        operand: 2,
      })

      doCalculate(sw.given, sw.command)

      expect(sw.changedVar()).toEqual(1);
    })

    test('rounds down below 0.5', () => {
      const sw = createSimpleCalculateInput({
        startingValue: 1,
        operator: 'divideThenRound',
        operand: 2.00001,
      })

      doCalculate(sw.given, sw.command)

      expect(sw.changedVar()).toEqual(0);
    })
  });

  describe('operators: round', () => {
    test('rounds the value from the variable', () => {
      const sw = createSimpleCalculateInput({
        startingValue: 12.5,
        operator: 'round',
        operand: 7, // ignored
      })

      doCalculate(sw.given, sw.command)

      expect(sw.changedVar()).toEqual(13);
    })
  });

  describe('operators: roundUp', () => {
    test('rounds the value up from the variable', () => {
      const sw = createSimpleCalculateInput({
        startingValue: 12.2,
        operator: 'roundUp',
        operand: 7, // ignored
      })

      doCalculate(sw.given, sw.command)

      expect(sw.changedVar()).toEqual(13);
    })
  });

  describe('operators: roundDown', () => {
    test('rounds the value down from the variable', () => {
      const sw = createSimpleCalculateInput({
        startingValue: 12.7,
        operator: 'roundDown',
        operand: 7, // ignored
      })

      doCalculate(sw.given, sw.command)

      expect(sw.changedVar()).toEqual(12);
    })
  });
});
