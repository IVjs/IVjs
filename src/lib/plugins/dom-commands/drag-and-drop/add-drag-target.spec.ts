import { create } from '../../../../test-support/factories';
import { IV } from '../../../iv';
import { findAll, getCurrentVideo, find, wait } from '../../../../test-support';

describe('addDragTarget', () => {
  let iv: IV;
  beforeEach(() => (iv = new IV()));

  describe('commands', () => {
    test('it creates the correct command', () => {
      const expectedObject = create('addDragTargetCommand', {
        id: 'target',
        size: { width: 10, height: 10 },
        position: { x: 10, y: 10 },
        acceptDragItems: ['thumbsUp'],
        onSuccess: { setVariable: 'droppedItem', goToNode: 'drag success' },
      });

      iv.node('anything').addDragTarget({
        id: 'target',
        width: 10,
        height: 10,
        left: 10,
        top: 10,
        acceptDragItems: ['thumbsUp'],
        onSuccess: { setVariable: 'droppedItem', goToNode: 'drag success' },
      });

      expect((iv as any).nodes[0].commands[0]).toEqual(expectedObject);
    });
  });

  describe('integration', () => {
    test('it adds the target to the DOM', () => {
      iv.node('anything').addDragTarget(create('addDragTargetInput', { id: 'draggable' }));

      iv.run('anything');

      expect(findAll('#draggable')).toHaveLength(1);
    });

    test('it adds a video to the DOM if one does not exist', () => {
      // This is necessary because all the sizing is based on the size of the video.
      // So the video needs to be present for this to work.
      iv.node('anything').addDragTarget(create('addDragTargetInput'));

      iv.run('anything');

      expect(findAll('video').length).toBeGreaterThanOrEqual(1);
    });
  });
});
