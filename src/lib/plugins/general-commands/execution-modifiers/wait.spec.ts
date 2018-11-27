import { create } from '../../../../test-support/factories';
import { IV } from '../../../iv';

describe('wait()', () => {
  let iv;
  beforeEach(() => (iv = new IV()));

  describe('when given a number', () => {
    test('it creates a valid wait Command', () => {
      const expectedObject = create('waitCommand', { time: 5500 });

      iv.node('anything').wait(5.5);

      expect(iv.nodes[0].commands[0]).toEqual(expectedObject);
    });
  });
});
