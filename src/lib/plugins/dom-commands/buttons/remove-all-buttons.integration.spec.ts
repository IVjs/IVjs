import { querySelectorAll, wait } from '../../../../test-support';
import { IV } from '../../../iv';

function getButtons() {
  return querySelectorAll('button')
}

function btnOptions(overrides = {}) {
  return {
    id: 'myBtn',
    js: jest.fn(),
    text: 'My Button', ...overrides
  };
}

describe('removeAllButtons()', () => {
  let iv: IV;
  beforeEach(() => {
    iv = new IV();
    iv.variables = {};
  })

  test('removes all buttons', async () => {
    iv.node('any')
      .addButton(btnOptions({ id: '1' }))
      .addButton(btnOptions({ id: '2' }))
      .addButton(btnOptions({ id: '3' }))
      .removeAllButtons()

    iv.run('any');

    await wait();

    expect(getButtons()).toHaveLength(0);
  });
});
