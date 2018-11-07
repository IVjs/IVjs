import { create, createMockEngine, querySelectorAll, simulateEventOnElement } from '../../../../test-support'
import { addButtonFactory, removeButtonFactory } from './button-commands';

function validSettings() {
  return {
    onClick: jest.fn()
  }
}

jest.mock('./buttons-controller');
import { buttonsController } from './buttons-controller';

describe('add button factory', () => {
  test('it produces a valid TFO', () => {
    const tfo = addButtonFactory({
      settings: create('ivSettings'),
      commandEngine: createMockEngine(),
      variables: {}
    });

    expect(tfo).toHaveProperty('addButton')
    expect(typeof tfo.addButton).toEqual('function')
  })

  test('it creates a button via the controller', () => {
    const tfo = addButtonFactory({
      settings: create('ivSettings'),
      commandEngine: createMockEngine(),
      variables: {}
    });

    tfo.addButton(create('addButtonCommand'));

    expect(buttonsController.createButton).toHaveBeenCalled();
  })

  test('it calls removebutton with an id', () => {
    const settings = {
      settings: create('ivSettings'),
      commandEngine: createMockEngine(),
      variables: {}
    };
    const tfo = addButtonFactory(settings);
    const tfo2 = removeButtonFactory(settings);

    const remove = create('removeButtonCommand', {
      id: 'myId',
    });

    tfo2.removeButton(remove);

    expect(buttonsController.removeButton).toHaveBeenCalledWith('myId')
  });

  test.skip('it passes along attrs to the button', () => {
    const tfo = addButtonFactory({
      settings: create('ivSettings'),
      commandEngine: createMockEngine(),
      variables: {}
    });

    const cmd = create('addButtonCommand', {
      attributes: [
        {name: 'class', value: 'my-class'}
      ]
    })
    tfo.addButton(cmd);

    const { calls } = (buttonsController as any).createButton.mock
    const lastCall = calls[calls.length - 1]
    expect(lastCall).toContain({name: 'class', value: 'my-class'});
  })

})
