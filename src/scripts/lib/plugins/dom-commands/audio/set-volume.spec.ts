import { create } from '../../../../../test-support/factories';
import { IV } from '../../../iv';

describe('setVolume()', () => {
  let iv;
  beforeEach(() => iv = new IV())

  describe('audio volume', () => {
    test('volume change', () => {
      const expectedObject = create('audioVolumeCommand', {
        target: 'BG',
        volume: 0.3,
      });
  
      iv.node('anything').setVolume({
        target: 'BG',
        volume: 0.3,
      });
  
      expect(iv.nodes[0].commands).toEqual([expectedObject]);
    })
  });
})
