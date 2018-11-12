import { wait } from '../../../../test-support';
import { IV } from '../../../iv';

describe('.gosub()', () => {
  let iv: IV;
  beforeEach(() => {
    iv = new IV();
    iv.variables = { count: 0 };
  })

  test('pauses execution and resumes when other node completes', async () => {
    iv.node('anything')
      .calculate({ var: 'count', add: 1 })
      .goSub('second')
      .calculate({ var: 'count', add: 1 })

    iv.node('second')
      .calculate({ var: 'count', add: 1 })
      .wait(0.010)

    iv.run('anything');

    await wait(5);
    expect(iv.variables.count).toEqual(2)
    await wait(6);
    expect(iv.variables.count).toEqual(3)
  });
})
