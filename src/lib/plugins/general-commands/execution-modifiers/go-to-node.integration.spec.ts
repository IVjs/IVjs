import { wait } from '../../../../test-support';
import { IV } from '../../../iv';

describe('.goToNode()', () => {
  let iv: IV;
  beforeEach(() => {
    iv = new IV();
    iv.variables = { count: 0 };
  });

  test('pauses execution and resumes when other node completes', async () => {
    iv.node('first')
      .calculate({ var: 'count', add: 1 })
      .goToNode('second');

    iv.node('second')
      .calculate({ var: 'count', add: 1 })
      .goToNode('third');

    iv.node('third').calculate({ var: 'count', add: 1 });

    iv.run('first');

    await wait(6);
    expect(iv.variables.count).toEqual(3);
  });
});
