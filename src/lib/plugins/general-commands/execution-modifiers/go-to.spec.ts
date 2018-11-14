import { create } from '../../../../test-support/factories';
import { IV } from '../../../iv';

describe('goToNode()', () => {
  let iv;
  beforeEach(() => iv = new IV())

  describe('when given a node', () => {
    test('it creates valid goToNode commands', () => {
      const expectedObject = create('goToNodeCommand', {
        nodeName: 'nodeName'
      });
      const expectedObject1 = create('stopExecutionCommand')
  

      iv.node('anything').goToNode('nodeName');

      expect(iv.nodes[0].commands).toEqual([expectedObject, expectedObject1]);
    })
  });

  describe('when given a node for sub', () => {
    test('it creates a valid executeSync commands', () => {
      const expectedObject = create('executeSyncCommand', {
        nodeName: 'nodeName'
      });

      iv.node('anything').runSync('nodeName');

      expect(iv.nodes[0].commands).toEqual([expectedObject]);
    })
  });

  describe('when given a node for execute', () => {
    test('it creates a valid execute command', () => {
      const expectedObject = create('executeAsyncCommand', {
        nodeName: 'nodeName'
      });

      iv.node('anything').runAsync('nodeName');

      expect(iv.nodes[0].commands).toEqual([expectedObject]);
    })
  });

  describe('when given a node for return', () => {
    test('it creates a valid return command', () => {
      const expectedObject = create('stopExecutionCommand');

      iv.node('anything').endAllNodes();

      expect(iv.nodes[0].commands).toEqual([expectedObject]);
    })
  });

})