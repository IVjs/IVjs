import { wait } from '../../../../test-support';
import { IV } from '../../../iv';

describe('.js()', () => {
  let iv: IV;
  beforeEach(() => {
    iv = new IV();
    iv.variables = {};
  });

  test('it runs the passed function', () => {
    const spy = jest.fn();
    iv.node('anything').js(spy);

    iv.run('anything');

    expect(spy).toHaveBeenCalled();
  });

  test('it is still chainable', async () => {
    const spy = jest.fn();
    const spy2 = jest.fn();
    iv.node('anything')
      .js(spy)
      .js(spy2);

    iv.run('anything');

    await wait();

    expect(spy).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
  });
});
