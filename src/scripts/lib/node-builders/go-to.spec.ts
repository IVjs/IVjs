import { IV } from '../iv';
import { create } from '../../../test-support/factories';

describe('goto()', () => {
  let iv;
  beforeEach(() => iv = new IV())

  describe('when given a node', () => {
    test('it creates valid goto commands', () => {
      const expectedObject = create('goToNodeCommand', {
        nodeName: 'nodeName'
      });
      const expectedObject1 = create('stopExecutionCommand')
  

      iv.node('anything').goto('nodeName');

      expect(iv.nodes[0].commands).toEqual([expectedObject, expectedObject1]);
    })
  });

  describe('when given a node for sub', () => {
    test('it creates a valid goSub commands', () => {
      const expectedObject = create('executeSyncCommand', {
        nodeName: 'nodeName'
      });

      iv.node('anything').goSub('nodeName');

      expect(iv.nodes[0].commands).toEqual([expectedObject]);
    })
  });

  describe('when given a node for execute', () => {
    test('it creates a valid execute command', () => {
      const expectedObject = create('executeAsyncCommand', {
        nodeName: 'nodeName'
      });

      iv.node('anything').execute('nodeName');

      expect(iv.nodes[0].commands).toEqual([expectedObject]);
    })
  });

  describe('when given a node for return', () => {
    test('it creates a valid return command', () => {
      const expectedObject = create('stopExecutionCommand');

      iv.node('anything').return();

      expect(iv.nodes[0].commands).toEqual([expectedObject]);
    })
  });

})