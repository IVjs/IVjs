import { create } from '../../test-support/factories';
import { IV } from '../iv';

describe('if-else()', () => {
  let iv;
  beforeEach(() => iv = new IV())

  describe('when given a condition', () => {
    test('it creates a valid switch Command', () => {
      const expectedObject = create('switchCommand',{
          name: 'switch',
          do: [
            {varName: 'count', is: 5, commands:[{name:'playVideo', file:'test.mp4'},{name:'goToNode', nodeName:'first'},{name:'stopExecution'}]},
            {varName: 'count', is: 6, commands:[{name:'playVideo', file:'test1.mp4'},{name:'goToNode', nodeName:'first1'},{name:'stopExecution'}]}
         ],
          defaultCommands: [{name:'goToNode', nodeName:'second'},{name:'stopExecution'}]
      });

      iv.node('anything')
        .if({var:'count', is: 5})
          .playVideo('test.mp4').goto('first')
        .if({var:'count', is: 6})
          .playVideo('test1.mp4').goto('first1')
        .else()
          .goto('second')
        .endIf()

      expect(iv.nodes[0].commands[0]).toEqual(expectedObject);
    })
  })
})
