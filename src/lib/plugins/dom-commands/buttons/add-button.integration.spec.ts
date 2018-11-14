import { querySelectorAll, simulateEventOnElement, wait } from '../../../../test-support';
import { IV } from '../../../iv';
import { ButtonOptions } from './button-commands-builder';

function getButtons() {
  return querySelectorAll('button')
}

function btnOptions(overrides: Partial<ButtonOptions> = {}): ButtonOptions {
  return {
    id: 'myBtn',
    js: jest.fn(),
    text: 'My Button', ...overrides
  };
}

describe('.addButton()', () => {
  let iv: IV;
  beforeEach(() => {
    iv = new IV();
    iv.variables = {count: 0};
  })

  async function addButtonWithSettings(settings: ButtonOptions) {
    iv.node('first')
      .addButton(settings)

    iv.node('second')
      .calculate({ var: 'count', add: 1 })

    iv.run('first');

    await wait();
  }

  test('adds a button to the page', async () => {
    await addButtonWithSettings(btnOptions())
    expect(querySelectorAll('button')).toHaveLength(1);
  });

  test('the button fires js when clicked', async () => {
    const settings = btnOptions();
    await addButtonWithSettings(settings)

    simulateEventOnElement('click', getButtons()[0])

    expect(settings.js).toHaveBeenCalled();
  });

  test('the button can be removed when clicked', async () => {
    const settings = btnOptions({ remove: true });
    await addButtonWithSettings(settings)

    simulateEventOnElement('click', getButtons()[0])

    await wait();
    expect(getButtons()).toHaveLength(0);
  });

  test('the button can go to node on click', async () => {
    const settings = btnOptions({ goToNode: 'second'});
    await addButtonWithSettings(settings)

    simulateEventOnElement('click', getButtons()[0])

    await wait();
    expect(iv.variables.count).toBe(1);
  });

});
