import { IV } from '../../../iv';
import { findAll, getCurrentVideo, find, wait } from '../../../../test-support';

describe('addDragItem', () => {
  let iv: IV;
  beforeEach(() => (iv = new IV()));

  describe('integration', () => {
    it('it sizes the item in relation to the video', async () => {
      iv.node('anything')
        .playVideo('someUrl.mp4')
        .js(() =>
          findAll('video').forEach((el: any) => {
            el.width = 160;
            el.height = 90;
          }),
        )
        .addDragItem({ id: 'draggable', image: 'anImage.jpg', width: 50, height: 20 });

      iv.run('anything');
      await wait();

      const video = getCurrentVideo();
      const image = find('img') as HTMLImageElement;

      expect(image.width).toBeCloseTo(video.width / 2);
      expect(image.height).toBeCloseTo(video.height / 5);
    });
  });
});
