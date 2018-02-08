import { IV } from './../iv';

describe('getRandom()', () => {
  let iv;
  beforeEach(() => iv = new IV())

  describe('when given an object', () => {
    test('it creates a valid getRandom Command', () => {
      const expectedObject = {
        name: 'getRandomNumber',
        min: 1,
        max: 5,
        assignTo: 'myRandom'
      };

      iv.defineNode('anything').getRandom({min:1, max:5, assignTo:'myRandom'});

      expect(iv.nodes[0].commands[0]).toEqual(expectedObject);
    })
  })
})