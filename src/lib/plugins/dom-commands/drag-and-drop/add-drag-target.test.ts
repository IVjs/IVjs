import { create } from '../../../../test-support/factories';
import { IV } from '../../../iv';
import { findAll, find, wait } from '../../../../test-support';
import { videoController } from '../video/video-controller';

describe('addDragTarget', () => {
  let iv: IV;
  beforeEach(() => (iv = new IV()));

  describe('integration', () => {
    it('it sizes the target in relation to the video', async () => {
      iv.node('anything')
        .playVideo('someUrl.mp4')
        .js(() =>
          findAll('video').forEach((el: any) => {
            el.width = 160;
            el.height = 90;
          }),
        )
        .addDragTarget(create('addDragTargetInput', { id: 'draggable', width: 50, height: 20 }));

      iv.run('anything');
      await wait();

      const video = videoController.getCurrentPlayer();
      const target = find('#draggable') as HTMLDivElement;

      expect(parseInt(target.style.width, 10)).toBeCloseTo(video.width / 2);
      expect(parseInt(target.style.height, 10)).toBeCloseTo(video.height / 5);
    });

    it('it places the target in relation to the video', async () => {
      iv.node('anything')
        .playVideo('someUrl.mp4')
        .js(() =>
          findAll('video').forEach((el: HTMLVideoElement) => {
            el.width = 200;
            el.height = 200;
          }),
        )
        .addDragTarget(create('addDragTargetInput', { id: 'draggable', top: 50, left: 20 }));

      iv.run('anything');
      await wait(10);

      const video = videoController.getCurrentPlayer();
      const target = find('#draggable') as HTMLDivElement;

      expect(target.offsetTop).toBeCloseTo(video.offsetTop + 100);
      expect(target.offsetLeft).toBeCloseTo(video.offsetLeft + 40);
    });

    it('it shows a border around the target when visible', async () => {
      iv.node('anything')
        .playVideo('someUrl.mp4')
        .addDragTarget(create('addDragTargetInput', { id: 'draggable', visible: true }));

      iv.run('anything');
      await wait(10);

      const target = find('#draggable') as HTMLDivElement;
      expect(target.style.border).not.toEqual('');
    });

    it('it does not add a border around the target when visible', async () => {
      iv.node('anything')
        .playVideo('someUrl.mp4')
        .addDragTarget(create('addDragTargetInput', { id: 'draggable', visible: false }));

      iv.run('anything');
      await wait(10);

      const target = find('#draggable') as HTMLDivElement;

      expect(target.style.border).toEqual('');
    });
  });
});
