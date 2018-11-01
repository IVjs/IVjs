import { create, createMockEngine } from '../../../../test-support'
import { doSwitch, switchFactory } from './switch';

function createSimpleSwitchInput({operator, operandValue, actualValue}) {
  const given = create('targetFunctionFactoryInput', { variables: { myVar: actualValue } });
  const passCommand = create('targetCommand');
  const failCommand = create('waitCommand');
  const theDo = {
    varName: 'myVar',
    commands: [passCommand]
  } as SwitchDo.Any;
  theDo[operator] = operandValue
  const swCmd = create('switchCommand', {
    do: [theDo],
    defaultCommands: [failCommand]
  });

  return {given, command: swCmd, passCommand, failCommand};
}

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
    test('returns passing commands when var is equal to given', () => {
      const sw = createSimpleSwitchInput({
        actualValue: 12,
        operator: 'is',
        operandValue: 12,
      })

      const returned = doSwitch(sw.given, sw.command)

      expect(returned.commands).toEqual([sw.passCommand]);
    })
  });

  describe('operators: greaterThan', () => {
    test('returns passing commands when var is greater than given', () => {
      const sw = createSimpleSwitchInput({
        actualValue: 12,
        operator: 'isGreaterThan',
        operandValue: 11,
      })

      const returned = doSwitch(sw.given, sw.command)

      expect(returned.commands).toEqual([sw.passCommand]);
    })
  });

  describe('operators: lessThan', () => {
    test('returns passing commands when var is less than given', () => {
      const sw = createSimpleSwitchInput({
        actualValue: 12,
        operator: 'isLessThan',
        operandValue: 13,
      })

      const returned = doSwitch(sw.given, sw.command)

      expect(returned.commands).toEqual([sw.passCommand]);
    })
  });

  describe('operators: greater than or equal to', () => {
    test('returns passing commands when var is equal to', () => {
      const sw = createSimpleSwitchInput({
        actualValue: 12,
        operator: 'isGreaterThanOrEqualTo',
        operandValue: 12,
      })

      const returned = doSwitch(sw.given, sw.command)

      expect(returned.commands).toEqual([sw.passCommand]);
    })
    test('returns passing commands when var is greater than', () => {
      const sw = createSimpleSwitchInput({
        actualValue: 12,
        operator: 'isGreaterThanOrEqualTo',
        operandValue: 11,
      })

      const returned = doSwitch(sw.given, sw.command)

      expect(returned.commands).toEqual([sw.passCommand]);
    })
  });

  describe('operators: less than or equal to', () => {
    test('returns passing commands when var is equal to', () => {
      const sw = createSimpleSwitchInput({
        actualValue: 12,
        operator: 'isLessThanOrEqualTo',
        operandValue: 12,
      })

      const returned = doSwitch(sw.given, sw.command)

      expect(returned.commands).toEqual([sw.passCommand]);
    })
    test('returns passing commands when var is less than', () => {
      const sw = createSimpleSwitchInput({
        actualValue: 12,
        operator: 'isLessThanOrEqualTo',
        operandValue: 13,
      })

      const returned = doSwitch(sw.given, sw.command)

      expect(returned.commands).toEqual([sw.passCommand]);
    })
  });

  describe('operators: between', () => {
    test('returns passing commands when var between given array', () => {
      const sw = createSimpleSwitchInput({
        actualValue: 12,
        operator: 'isBetween',
        operandValue: [11, 13],
      })

      const returned = doSwitch(sw.given, sw.command)

      expect(returned.commands).toEqual([sw.passCommand]);
    })
    test('returns passing commands when var is equal to highest', () => {
      const sw = createSimpleSwitchInput({
        actualValue: 12,
        operator: 'isBetween',
        operandValue: [11, 12],
      })

      const returned = doSwitch(sw.given, sw.command)

      expect(returned.commands).toEqual([sw.passCommand]);
    })
    test('returns passing commands when var is equal to lowest', () => {
      const sw = createSimpleSwitchInput({
        actualValue: 12,
        operator: 'isBetween',
        operandValue: [12, 13],
      })

      const returned = doSwitch(sw.given, sw.command)

      expect(returned.commands).toEqual([sw.passCommand]);
    })
    test('returns failing commands when var is less than lowest', () => {
      const sw = createSimpleSwitchInput({
        actualValue: 12,
        operator: 'isBetween',
        operandValue: [13, 14],
      })

      const returned = doSwitch(sw.given, sw.command)

      expect(returned.commands).toEqual([sw.failCommand]);
    })
    test('returns failing commands when var is greater than highest', () => {
      const sw = createSimpleSwitchInput({
        actualValue: 12,
        operator: 'isBetween',
        operandValue: [10, 11],
      })

      const returned = doSwitch(sw.given, sw.command)

      expect(returned.commands).toEqual([sw.failCommand]);
    })
  });

  describe('operators: unknown', () => {
    test('it throws', () => {
      const sw = createSimpleSwitchInput({
        actualValue: 12,
        operator: 'isAMonkey',
        operandValue: 11,
      })

      expect(() => doSwitch(sw.given, sw.command)).toThrow();
    })
  });

  describe('operator precedence', () => {
    test('returns passing commands for first valid condition', () => {
      const given = create('targetFunctionFactoryInput', { variables: { myVar: 12 } });
      const passCommand = create('targetCommand');
      const failCommand = create('waitCommand');
      const swCmd = create('switchCommand', {
        do: [
          {
            varName: 'myVar',
            is: 12,
            commands: [passCommand]
          },
          {
            varName: 'myVar',
            is: 12,
            commands: [failCommand]
          },
        ],
        defaultCommands: [failCommand]
      });

      const returned = doSwitch(given, swCmd)

      expect(returned.commands).toEqual([passCommand]);
    })

    test('returns default commands when no valid condition', () => {
      const given = create('targetFunctionFactoryInput', { variables: { myVar: 12 } });
      const defaultCommand = create('targetCommand');
      const failCommand = create('waitCommand');
      const swCmd = create('switchCommand', {
        do: [
          {
            varName: 'myVar',
            is: 13,
            commands: [failCommand]
          },
          {
            varName: 'myVar',
            is: 11,
            commands: [failCommand]
          },
        ],
        defaultCommands: [defaultCommand]
      });

      const returned = doSwitch(given, swCmd)

      expect(returned.commands).toEqual([defaultCommand]);
    })
  });

})