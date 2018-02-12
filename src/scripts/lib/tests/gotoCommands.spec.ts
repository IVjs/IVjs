import { IV } from './../iv';
import { create } from '../../../test-support/factories';

describe('goto()', () => {
  let iv;
  beforeEach(() => iv = new IV())

  describe('when given a node', () => {
    test('it creates valid goto commands', () => {
      const expectedObject =  {
          name: 'goToNode',
          nodeName:'nodeName'
        };
        const expectedObject1 =  {
            name: 'stopExecution',
          };
  

      iv.node('anything').goto('nodeName');

      expect(iv.nodes[0].commands[0]).toEqual(expectedObject);
      expect(iv.nodes[0].commands[1]).toEqual(expectedObject1);
    })
  });

  describe('when given a node for sub', () => {
    test('it creates a valid goSub commands', () => {
      const expectedObject =  {
          name: 'executeSync',
          nodeName:'nodeName'
        };
        const expectedObject1 =  {
            name: 'pauseExecution',
          };
  

      iv.node('anything').goSub('nodeName');

      expect(iv.nodes[0].commands[0]).toEqual(expectedObject);
      expect(iv.nodes[0].commands[1]).toEqual(expectedObject1);
    })
  });

  describe('when given a node for execute', () => {
    test('it creates a valid execute command', () => {
      const expectedObject =  {
          name: 'executeAsync',
          nodeName:'nodeName'
        };
 

      iv.node('anything').execute('nodeName');

      expect(iv.nodes[0].commands[0]).toEqual(expectedObject);
    })
  });

  describe('when given a node for return', () => {
    test('it creates a valid return command', () => {
      const expectedObject =  {
          name: 'stopExecution',
        };
 

      iv.node('anything').return();

      expect(iv.nodes[0].commands[0]).toEqual(expectedObject);
    })
  });

})