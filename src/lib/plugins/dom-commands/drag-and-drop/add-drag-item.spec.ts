import { create } from '../../../../test-support/factories';
import { IV } from '../../../iv';
import { findAll, getCurrentVideo, find, wait } from '../../../../test-support';

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

      expect(findAll('img')).toHaveLength(1);
    });

    test('it adds a video to the DOM if one does not exist', () => {
      // This is necessary because all the sizing is based on the size of the video.
      // So the video needs to be present for this to work.
      iv.node('anything').addDragItem({ id: 'draggable', image: 'anImage.jpg' });

      iv.run('anything');

      expect(findAll('video').length).toBeGreaterThanOrEqual(1);
    });
  });

  test('it sizes the item in relation to the video', async () => {
    iv.node('anything')
      .playVideo('someUrl.mp4')
      .js(() =>
        // There is no apparent way to force widths and heights in jsdom aside from direct manipulation
        findAll('video').forEach((el: any) => {
          el.width = 160;
          el.height = 90;
        }),
      )
      .addDragItem({ id: 'draggable', image: 'anImage.jpg', size: { width: 50, height: 20 } });

    iv.run('anything');
    await wait();

    const video = getCurrentVideo();
    const image = find('img') as HTMLImageElement;

    expect(image.width).toBeCloseTo(video.width / 2);
    expect(image.height).toBeCloseTo(video.height / 5);
  });
});
