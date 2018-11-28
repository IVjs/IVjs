import { create } from '../../../../test-support/factories';
import { IV } from '../../../iv';

describe('addDragItem', () => {
  let iv;
  beforeEach(() => (iv = new IV()));

  describe('commands', () => {
    test('it creates the correct command', () => {
      const expectedObject = create('addDragItemCommand', { id: 'draggable', imageUrl: 'anImage.jpg' });

      iv.node('anything').addDragItem({ id: 'draggable', image: 'anImage.jpg' });

      expect(iv.nodes[0].commands[0]).toEqual(expectedObject);
    });
  });
});
