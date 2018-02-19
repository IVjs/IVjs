import { PartialLiquid } from './partialLiquid';

describe('partial liquid', () => {
  let liq: PartialLiquid;
  beforeEach(() => {
    liq = new PartialLiquid({name: 'Don', age: 34, family: ['Paige', 'Toffee']})
  })

  test('it replaces a simple variable', () => {
    const input = 'My name is {{name}}';
    expect(liq.replace(input)).toEqual('My name is Don')
  });

  test('it coerces a string from a number', () => {
    const input = 'I am {{age}}';
    expect(liq.replace(input)).toEqual('I am 34')
  });

  test('it keeps the value\'s type when not in a string', () => {
    const input = '{{age}}';
    expect(liq.replace(input)).toEqual(34)
  });


});