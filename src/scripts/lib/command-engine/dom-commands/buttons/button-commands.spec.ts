import { addButtonFactory } from './button-commands';
import { buttonsController } from './buttons-controller';
import { create, createMockEngine, querySelectorAll, simulateEventOnElement } from '../../../../../test-support'

function validSettings() {
  return {
    onClick: jest.fn()
  }
}

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

  test('it creates a button in the DOM', () => {
    const tfo = addButtonFactory({
      settings: create('ivSettings'),
      commandEngine: createMockEngine(),
      variables: {}
    });

    tfo.addButton(create('addButtonCommand'));

    expect(querySelectorAll('button')).toHaveLength(1);
  })

  test('it fires commands when clicked', () => {
    const mockEngine = createMockEngine()
    const tfo = addButtonFactory({
      settings: create('ivSettings'),
      commandEngine: mockEngine,
      variables: {}
    });
    tfo.addButton(create('addButtonCommand'));
    const button = querySelectorAll('button')[0];

    simulateEventOnElement('click', button);

    expect(mockEngine.runCommands).toHaveBeenCalled();
  })

  test('it sets the id of the button', () => {
    const tfo = addButtonFactory({
      settings: create('ivSettings'),
      commandEngine: createMockEngine(),
      variables: {}
    });

    const cmd = create('addButtonCommand', {
      id: 'myId',
    })
    tfo.addButton(cmd);

    const button = querySelectorAll('button')[0] as HTMLButtonElement;
    expect(button.id).toEqual('myId');
  })

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

    const button = querySelectorAll('button')[0] as HTMLButtonElement;
    expect(button.class).toEqual('my-class');
  })

})
