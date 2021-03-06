import { create } from '../../../../test-support';
import { IV } from '../../../iv';

describe('setVariable()', () => {
  let iv;
  beforeEach(() => {
    iv = new IV();
    iv.variables = { var1: 5, var2: 8 };
  });

  describe('when given an object with a var', () => {
    test('it creates a valid setVariable Command', () => {
      const expectedObject = create('assignFromVariableCommand', {
        varName: 'var1',
        assignTo: 'var2',
      });

      iv.node('anything').setVariable({ var: 'var1', storeIn: 'var2' });

      expect(iv.nodes[0].commands[0]).toEqual(expectedObject);
    });
  });

  describe('when given an object with a string', () => {
    test('it creates a valid setVariable Command', () => {
      const expectedObject = create('assignVariableCommand', {
        value: 'string',
        assignTo: 'var2',
      });

      iv.node('anything').setVariable({ value: 'string', storeIn: 'var2' });

      expect(iv.nodes[0].commands[0]).toEqual(expectedObject);
    });
  });

  describe('when given an object with an array of strings', () => {
    test('it creates a valid setVariable Command', () => {
      const expectedObject = create('assignVariableCommand', {
        value: ['string', 'string', 'string'],
        assignTo: 'var2',
      });

      iv.node('anything').setVariable({ value: ['string', 'string', 'string'], storeIn: 'var2' });

      expect(iv.nodes[0].commands[0]).toEqual(expectedObject);
    });
  });

  describe('when given a number', () => {
    test('it creates a valid setVariable Command', () => {
      const expectedObject = create('assignVariableCommand', {
        value: 1,
        assignTo: 'var2',
      });

      iv.node('anything').setVariable({ value: 1, storeIn: 'var2' });

      expect(iv.nodes[0].commands[0]).toEqual(expectedObject);
    });
  });
});
