import { wait } from '../../../../test-support';
import { IV } from '../../../iv';

describe('.setVariable()', () => {
  let iv: IV;
  beforeEach(() => {
    iv = new IV();
    iv.variables = {};
  });

  test('it stores the variable', () => {
    iv.node('anything').setVariable({ storeIn: 'name', value: 'bob' });

    iv.run('anything');

    expect(iv.variables.name).toEqual('bob');
  });

  test('it stores the variable', async () => {
    iv.node('anything')
      .setVariable({ storeIn: 'name', value: 'bob' })
      .setVariable({ var: 'name', storeIn: 'sameName' });

    iv.run('anything');
    await wait();

    expect(iv.variables.sameName).toEqual('bob');
  });
});
