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

    test('it sizes the target in relation to the video', async () => {
      iv.node('anything')
        .playVideo('someUrl.mp4')
        .js(() =>
          // There is no apparent way to force widths and heights in jsdom aside from direct manipulation
          findAll('video').forEach((el: any) => {
            el.width = 160;
            el.height = 90;
          }),
        )
        .addDragTarget(create('addDragTargetInput', { id: 'draggable', width: 50, height: 20 }));

      iv.run('anything');
      await wait();

      const video = getCurrentVideo();
      const target = find('#draggable') as HTMLDivElement;

      expect(parseInt(target.style.width, 10)).toBeCloseTo(video.width / 2);
      expect(parseInt(target.style.height, 10)).toBeCloseTo(video.height / 5);
    });

    test.skip('it places the target in relation to the video', async () => {
      // This is untestable in jest without hacking big into implementation details of jsdom
      iv.node('anything')
        .playVideo('someUrl.mp4')
        .js(() =>
          // There is no apparent way to force widths and heights in jsdom aside from direct manipulation
          findAll('video').forEach((el: HTMLVideoElement) => {
            el.width = 160;
            el.height = 90;
          }),
        )
        .addDragTarget(create('addDragTargetInput', { id: 'draggable', top: 50, left: 20 }));

      iv.run('anything');
      await wait();

      const video = getCurrentVideo();
      const target = find('#draggable') as HTMLDivElement;
      const videoRect = video.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();

      expect(videoRect).toEqual('sadf');
      expect(targetRect.top).toBeCloseTo(videoRect.top + video.height / 2);
      expect(targetRect.left).toBeCloseTo(videoRect.left + video.width / 5);
    });
  });
});
