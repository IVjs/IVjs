import { IV } from '../../../iv';

describe('.getRandom()', () => {
  let iv: IV;
  beforeEach(() => {
    iv = new IV();
    iv.variables = {};
  })
  
  test('it stores a random number', () => {
    iv.node('anything')
      .getRandom({ storeIn: 'myRand', min: 5, max: 10 })

    iv.run('anything');

    expect(iv.variables.myRand).toBeGreaterThan(4)
    expect(iv.variables.myRand).toBeLessThan(11)
  });
})

