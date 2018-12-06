import { create } from '../../../../test-support/factories';
import { IV } from '../../../iv';
import { findAll, wait } from '../../../../test-support';

describe('remove zone', () => {
  let iv: IV;
  beforeEach(() => (iv = new IV()));

  describe('commands', () => {
    test('it creates the correct command for removing a zone', () => {
      const expectedObject = create('removeZoneCommand', { id: 'item' });

      iv.node('anything').removeZone('item');

      expect((iv as any).nodes[0].commands[0]).toEqual(expectedObject);
    });
  });

  describe('integration', () => {
    test('it removes the zone from the DOM', async () => {
      iv.node('anything')
        .addZone(create('addZoneInput', { id: 'area' }))
        .removeZone('area');

      iv.run('anything');

      await wait();

      expect(findAll('#area')).toHaveLength(0);
    });
  });
});
