import { IV } from './../iv';
import { create } from '../../../test-support/factories';

describe('getRandom()', () => {
  let iv;
  beforeEach(() => iv = new IV())

  describe('when given an object', () => {
    test('it creates a valid getRandom Command', () => {
      const expectedObject = create('getRandomNumberCommand', {
          min: 1,
          max: 5,
          assignTo: 'myRandom'
      });

      iv.node('anything').getRandom({min:1, max:5, assignTo:'myRandom'});

      expect(iv.nodes[0].commands[0]).toEqual(expectedObject);
    })
  })
})