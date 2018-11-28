import { create } from '../../../../test-support/factories';
import { IV } from '../../../iv';
import { querySelectorAll } from '../../../../test-support';

describe('addDragItem', () => {
  let iv: IV;
  beforeEach(() => (iv = new IV()));

  describe('commands', () => {
    test('it creates the correct command', () => {
      const expectedObject = create('addDragItemCommand', { id: 'draggable', imageUrl: 'anImage.jpg' });

      iv.node('anything').addDragItem({ id: 'draggable', image: 'anImage.jpg' });

      expect((iv as any).nodes[0].commands[0]).toEqual(expectedObject);
    });
  });

  describe('integration', () => {
    test('it adds the image to the DOM', () => {
      iv.node('anything').addDragItem({ id: 'draggable', image: 'anImage.jpg' });

      iv.run('anything');

      expect(querySelectorAll('img')).toHaveLength(1);
    });
  });
});
