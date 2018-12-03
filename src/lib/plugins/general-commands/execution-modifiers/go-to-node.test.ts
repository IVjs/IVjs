import { wait } from '../../../utils';
import { IV } from '../../../iv';
import '../../../../karma-support/setup';

describe('.goToNode()', () => {
  let iv: IV;
  beforeEach(() => {
    iv = new IV();
    iv.variables = { count: 0 };
  });

  it('pauses execution and resumes when other node completes', async () => {
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
