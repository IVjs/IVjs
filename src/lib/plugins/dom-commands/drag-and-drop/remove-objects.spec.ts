import { create } from '../../../../test-support/factories';
import { IV } from '../../../iv';
import { findAll, wait } from '../../../../test-support';

describe('remove drag and drop', () => {
  let iv: IV;
  beforeEach(() => (iv = new IV()));

  describe('commands', () => {
    test('it creates the correct command for removing a drag item', () => {
      const expectedObject = create('removeDragItemCommand', { id: 'item' });

      iv.node('anything').removeDragItem('item');

      expect((iv as any).nodes[0].commands[0]).toEqual(expectedObject);
    });

    test('it creates the correct command for removing a drag target', () => {
      const expectedObject = create('removeDragTargetCommand', { id: 'target' });

      iv.node('anything').removeDragTarget('target');

      expect((iv as any).nodes[0].commands[0]).toEqual(expectedObject);
    });
  });

  describe('integration', () => {
    test('it removes the target from the DOM', async () => {
      iv.node('anything')
        .addDragTarget(create('addDragTargetInput', { id: 'area' }))
        .removeDragTarget('area');

      iv.run('anything');

      await wait();

      expect(findAll('#area')).toHaveLength(0);
    });

    test('it removes the item from the DOM', async () => {
      iv.node('anything')
        .addDragItem(create('addDragItemInput', { id: 'draggable' }))
        .removeDragItem('draggable');

      iv.run('anything');

      await wait();

      expect(findAll('#draggable')).toHaveLength(0);
    });
  });
});
