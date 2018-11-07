import { create } from '../../../../test-support/factories';
import { IV } from '../../../iv';

describe('calculate()', () => {
  let iv;
  beforeEach(() => iv = new IV())
  
  describe('when given an add option', () => {
    test('it creates a valid getRandom Command', () => {
      const expectedObject = create('calculateCommand', {
        varName:'count',
        operation:'add',
        value:5,
        assignTo:'myResult'
      });
      
      iv.node('anything').calculate({var:'count', add: 5, storeIn:'myResult'});
      
      expect(iv.nodes[0].commands[0]).toEqual(expectedObject);
    });
    
    describe('when given an subtract option', () => {
      test('it creates a valid getRandom Command', () => {
        const expectedObject = create('calculateCommand', {
          name:'calculate', 
          varName:'count',
          operation:'subtract',
          value:5,
          assignTo:'myResult'
        });
        
        iv.node('anything').calculate({var:'count', subtract: 5, storeIn:'myResult'});
        
        expect(iv.nodes[0].commands[0]).toEqual(expectedObject);
      })
    });
    describe('when given a multiply option', () => {
      test('it creates a valid getRandom Command', () => {
        const expectedObject = create('calculateCommand', {
          name:'calculate', 
          varName:'count',
          operation:'multiply',
          value:5,
          assignTo:'myResult'
        });
        
        iv.node('anything').calculate({var:'count', multiply: 5, storeIn:'myResult'});
        
        expect(iv.nodes[0].commands[0]).toEqual(expectedObject);
      })
    });
    
    describe('when given a divide option', () => {
      test('it creates a valid getRandom Command', () => {
        const expectedObject = create('calculateCommand', {
          name:'calculate', 
          varName:'count',
          operation:'divide',
          value:5,
          assignTo:'myResult'
        });
        
        iv.node('anything').calculate({var:'count', divide: 5, storeIn:'myResult'});
        
        expect(iv.nodes[0].commands[0]).toEqual(expectedObject);
      })
    });
  });
});