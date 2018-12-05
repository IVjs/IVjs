import { create } from '../../../../test-support/factories';
import { IV } from '../../../iv';
import { findAll, find, wait, simulateEventOnElement } from '../../../../test-support';
import { videoController } from '../video/video-controller';

describe('drag and drop together', () => {
  let iv: IV;
  beforeEach(() => (iv = new IV()));

  it('it sizes the target in relation to the video', async () => {
    iv.node('anything')
      .playVideo('someUrl.mp4')
      .js(() =>
        findAll('video').forEach((el: any) => {
          el.width = 100;
          el.height = 100;
        }),
      )
      .addDragTarget(
        create('addDragTargetInput', { id: 'target', width: 10, height: 10, top: 0, left: 0, visible: true }),
      )
      .addDragItem({
        id: 'apple',
        image: 'apple.png',
        width: 10,
        height: 10,
      });

    iv.run('anything');
    await wait();

    const video = videoController.getCurrentPlayer();
    const target = find('#target') as HTMLDivElement;
    const draggable = find('#apple') as HTMLImageElement;
    const originalColor = target.style.borderColor;

    simulateEventOnElement('mousedown', draggable);
    simulateEventOnElement('mousemove', target, {});

    expect(target.style.borderColor).not.toEqual(originalColor);
  });
});
