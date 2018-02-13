import { IV } from './../iv';
import { create } from '../../../test-support/factories';

describe('if-else()', () => {
  let iv;
  beforeEach(() => iv = new IV())

  describe('when given a condition', () => {
    test('it creates a valid switch Command', () => {
      const expectedObject = {
          name: 'switch',
          do: [
            {varName: 'count', is: 5, commands:[{name:'playVideo', file:'test.mp4'},{name:'goToNode', nodeName:'first'},{name:'stopExecution'}]}
          ],
          defaultCommands: [{name:'goToNode', nodeName:'second'},{name:'stopExecution'}]
      };

      // why would this fill the .nodes[0].commands[0-1] ????.  It should fill the switch command.

      iv.node('anything').if({var:'count', is: 5}).videoPlay('test.mp4').goto('first').else().goto('second').endIf();
      
      expect(iv.nodes[0].commands[0]).toEqual(expectedObject);
    })
  })
})