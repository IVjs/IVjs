import { create } from '../../../../test-support/factories';
import { IV } from '../../../iv';
import { findAll, find, simulateEventOnElement } from '../../../../test-support';

describe('addZone', () => {
  let iv: IV;
  beforeEach(() => (iv = new IV()));

  describe('commands', () => {
    test('it creates the correct command', () => {
      const expectedObject = create('addZoneCommand', {
        id: 'zone1',
        size: { width: 10, height: 10 },
        position: { x: 10, y: 10 },
        onClick: { setVariable: 'zoneClicked', goToNode: 'zone click success' },
      });

      iv.node('anything').addZone({
        id: 'zone1',
        width: 10,
        height: 10,
        left: 10,
        top: 10,
        onClick: { setVariable: 'zoneClicked', goToNode: 'zone click success' },
      });

      expect((iv as any).nodes[0].commands[0]).toEqual(expectedObject);
    });
  });

  describe('integration', () => {
    test('it adds the zone to the DOM', () => {
      iv.node('anything').addZone(create('addZoneInput', { id: 'zone' }));

      iv.run('anything');

      expect(findAll('#zone')).toHaveLength(1);
    });

    describe('reacting to click events', () => {
      test('it sets a variable to its id', () => {
        iv.node('anything').addZone(create('addZoneInput', { id: 'zone1', onClick: { setVariable: 'clicked' } }));

        iv.run('anything');

        simulateEventOnElement('click', find('#zone1'));

        expect(iv.variables.clicked).toEqual('zone1');
      });

      test('it executes some js', () => {
        const spy = jest.fn();
        iv.node('anything').addZone(create('addZoneInput', { id: 'zone1', onClick: { js: spy } }));

        iv.run('anything');

        simulateEventOnElement('click', find('#zone1'));

        expect(spy).toHaveBeenCalled();
      });

      test('it executes a node', () => {
        iv.node('anything').addZone(create('addZoneInput', { id: 'zone1', onClick: { goToNode: 'check' } }));

        iv.node('check').setVariable({ storeIn: 'check', value: 1 });
        iv.run('anything');

        simulateEventOnElement('click', find('#zone1'));

        expect(iv.variables.check).toBe(1);
      });
    });

    test('it adds a video to the DOM if one does not exist', () => {
      // This is necessary because all the sizing is based on the size of the video.
      // So the video needs to be present for this to work.
      iv.node('anything').addZone(create('addZoneInput'));

      iv.run('anything');

      expect(findAll('video').length).toBeGreaterThanOrEqual(1);
    });
  });
});
