import { wait } from '../../../../test-support';
import { IV } from '../../../iv';

describe('.runAsync()', () => {
  let iv: IV;
  beforeEach(() => {
    iv = new IV();
    iv.variables = { started: 0, ended: 0 };
  });

  test('runs a node without waiting', async () => {
    iv.node('first')
      .calculate({ var: 'started', add: 1 })
      .runAsync('second')
      .calculate({ var: 'ended', add: 1 });

    iv.node('second')
      .calculate({ var: 'started', add: 1 })
      .wait(0.01)
      .calculate({ var: 'ended', add: 1 });

    iv.run('first');

    await wait(5);
    expect(iv.variables.started).toEqual(2);
    expect(iv.variables.ended).toEqual(1);
  });
});
