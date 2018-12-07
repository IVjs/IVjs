import { findAll, simulateEventOnElement } from '../../../../test-support';
import { defaults } from '../../../config';
import { buttonsController, IButtonSettings } from './buttons-controller';

function validSettings() {
  return {
    onClick: jest.fn(),
    text: 'Some Button',
  };
}

describe('buttons-controller', () => {
  describe('given a base element', () => {
    let baseEl;
    beforeEach(() => {
      baseEl = document.createElement('div');
      baseEl.id = 'other-element';
      document.body.appendChild(baseEl);
    });
    afterEach(() => {
      baseEl.remove();
    });

    test('it adds buttons to the proper element', () => {
      buttonsController.createButton(validSettings(), baseEl);
      expect(document.querySelectorAll(`#other-element button`).length).toEqual(1);
    });
  });
  describe('not given a base element', () => {
    test('it adds buttons to the default element', () => {
      buttonsController.createButton(validSettings());
      expect(document.querySelectorAll(`#${defaults.baseElementId} button`).length).toEqual(1);
    });
  });

  test('it fires the callback on onClick', () => {
    const settings = validSettings();
    const button = buttonsController.createButton(settings);

    simulateEventOnElement('click', button);

    expect(settings.onClick).toHaveBeenCalled();
  });

  test('it adds inner text', () => {
    const settings: IButtonSettings = validSettings();
    settings.text = 'My Button';

    const button = buttonsController.createButton(settings);

    expect(button.innerHTML).toEqual('My Button');
  });

  test('it can remove all buttons', () => {
    buttonsController.createButton(validSettings());
    buttonsController.createButton(validSettings());
    buttonsController.createButton(validSettings());

    buttonsController.removeAllButtons();

    expect(findAll('button')).toHaveLength(0);
  });

  describe('adding attributes', () => {
    const attributes = [{ name: 'class', value: 'my-special-class' }, { name: 'id', value: 'myId' }];

    attributes.forEach(attr => {
      test(`it correctly adds a ${attr.name}`, () => {
        const settings = validSettings();
        settings[attr.name] = attr.value;

        const button = buttonsController.createButton(settings);

        expect(button[attr.name]).toEqual(attr.value);
      });
    });
  });
});
