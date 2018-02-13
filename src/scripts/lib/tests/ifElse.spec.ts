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
            {varName: 'count', is: 5, commands:[{name:'playVideo', file:'test.mp4'},{name:'goToNode', nodeName:'first'},{name:'stopExecution'}]},
            {varName: 'count', is: 6, commands:[{name:'playVideo', file:'test1.mp4'},{name:'goToNode', nodeName:'first1'},{name:'stopExecution'}]}
         ],
          defaultCommands: [{name:'goToNode', nodeName:'second'},{name:'stopExecution'}]
      };
      const expectedObject1 = {name:'playVideo', file:'another.mp4'}

      iv.node('anything').if({var:'count', is: 5}).videoPlay('test.mp4').goto('first')
      .if({var:'count', is: 6}).videoPlay('test1.mp4').goto('first1')
      .else().goto('second').endIf().videoPlay('another.mp4');
      
      expect(iv.nodes[0].commands[0]).toEqual(expectedObject);
      //expect(iv.nodes[0].commands[1]).toEqual(expectedObject1);
    })
  })
})