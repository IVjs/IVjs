import { wait } from '../../../../test-support';
import { IV } from '../../../iv';

describe('.runSync()', () => {
  let iv: IV;
  beforeEach(() => {
    iv = new IV();
    iv.variables = { count: 0 };
  });

  test('pauses execution and resumes when other node completes', async () => {
    iv.node('anything')
      .calculate({ var: 'count', add: 1 })
      .runSync('second')
      .calculate({ var: 'count', add: 1 });

    iv.node('second')
      .calculate({ var: 'count', add: 1 })
      .wait(0.01);

    iv.run('anything');

    await wait(5);
    expect(iv.variables.count).toEqual(2);
    await wait(6);
    expect(iv.variables.count).toEqual(3);
  });
});
