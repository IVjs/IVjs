import { IV } from './../iv';

describe('setVariable()', () => {
  let iv;
  beforeEach(() => { 
  
    iv = new IV();
    iv.variables = {var1: 5, var2: 8};})

  describe('when given an object with a var', () => {
    test('it creates a valid setVariable Command', () => {
      const expectedObject = {
        name: 'assignVariable',
        var: 'var1',
        assignTo: 'var2'
      };

      iv.node('anything').getRandom({min:1, max:5, assignTo:'myRandom'});

      expect(iv.nodes[0].commands[0]).toEqual(expectedObject);
    })
  })
})