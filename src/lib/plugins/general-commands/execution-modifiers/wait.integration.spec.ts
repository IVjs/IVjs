import { wait } from '../../../../test-support';
import { IV } from '../../../iv';

describe('.wait()', () => {
  let iv: IV;
  beforeEach(() => {
    iv = new IV();
    iv.variables = { count: 0 };
  });

  test('waits and resumes when timeout ends', async () => {
    iv.node('anything')
      .calculate({ var: 'count', add: 1 })
      .wait(0.01)
      .calculate({ var: 'count', add: 1 });

    iv.run('anything');

    await wait(9);
    expect(iv.variables.count).toEqual(1);
    await wait(2);
    expect(iv.variables.count).toEqual(2);
  });
});
