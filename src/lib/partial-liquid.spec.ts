import { PartialLiquid } from './partial-liquid';

describe('partial liquid', () => {
  let liq: PartialLiquid;
  beforeEach(() => {
    liq = new PartialLiquid({ name: 'Don', age: 34, family: ['Paige', 'Toffee'] });
  });

  test('it does not fail on a string without replacements', () => {
    const input = 'My name is Don';
    expect(liq.replace(input)).toEqual('My name is Don');
  });

  test('it replaces a simple variable', () => {
    const input = 'My name is {{name}}';
    expect(liq.replace(input)).toEqual('My name is Don');
  });

  test('it coerces a string from a number', () => {
    const input = 'I am {{age}}';
    expect(liq.replace(input)).toEqual('I am 34');
  });

  test("it keeps the value's type when it is the only thing in the string", () => {
    const input = '{{age}}';
    expect(liq.replace(input)).toEqual(34);
  });

  test('replaces multiple instances', () => {
    const input = 'My name is {{name}} and I am {{age}}';
    expect(liq.replace(input)).toEqual('My name is Don and I am 34');
  });

  describe('filters', () => {
    describe('random', () => {
      test('it replaces with a member of an array', () => {
        const input = 'My favorite family member is {{family | random}}';
        const possibleOutcomes = ['My favorite family member is Paige', 'My favorite family member is Toffee'];
        const result = liq.replace(input);
        expect(possibleOutcomes).toContainEqual(result);
      });

      test('it returns a randomized result from an array', () => {
        const numAttempts = 100;
        const input = 'My favorite family member is {{family | random}}';
        const firstResult = liq.replace(input);
        let wasDifferent = false;
        for (let tries = 0; tries < numAttempts; tries++) {
          const anotherAttempt = liq.replace(input);
          if (firstResult !== anotherAttempt) {
            wasDifferent = true;
            break;
          }
        }
        expect(wasDifferent).toEqual(true);
      });
    });
  });
});
