import { create, createMockEngine } from '../../../../test-support'
import { getRandomNumber, getRandomNumberFactory } from './get-random-number';

type TFOIn = CommandEngine.TargetFunctionFactoryInput;

describe('get random number factory', () => {
  test('it produces a valid TFO', () => {
    const tfo = getRandomNumberFactory({
      settings: create('ivSettings'),
      commandEngine: createMockEngine(),
      variables: {}
    });

    expect(tfo).toHaveProperty('getRandomNumber')
    expect(typeof tfo.getRandomNumber).toEqual('function')
  })

  test('it sets a variable', () => {
    const variables: any = {};
    const given = { variables } as TFOIn // tslint:disable-line
    const command = create('getRandomNumberCommand', {
      min: 1,
      max: 100,
      assignTo: 'myRand',
    });

    getRandomNumber(given, command)

    expect(variables.myRand).toBeGreaterThan(0);
    expect(variables.myRand).toBeLessThan(101);
  })

  test('it produces random numbers', () => {
    const numAttempts = 100;
    let wasDifferent = false;
    const variables: any = {};
    const given = { variables } as TFOIn // tslint:disable-line
    const command = create('getRandomNumberCommand', {
      min: 1,
      max: 100,
      assignTo: 'myRand',
    });

    getRandomNumber(given, command)
    const lastResult = variables.myRand

    for (let tries = 0; tries < numAttempts; tries++) {
      getRandomNumber(given, command)
      const thisResult = variables.myRand;

      if (lastResult !== thisResult) {
        wasDifferent = true;
        break;
      }
    }

    expect(wasDifferent).toEqual(true)
  })
})