import { wait } from '../../../../test-support';
import { IV } from '../../../iv';


describe('.calculate() integration', () => {
  let iv: IV;
  
  beforeEach(() => {
    iv = new IV()
    iv.variables = {
      count: 10,
    };
  })

  test('modifies variable in place if no `storeIn` is provided', async () => {
    iv.node('anything')
      .calculate({ var: 'count', add: 1 })

    iv.run('anything');
    await wait();

    expect(iv.variables.count).toBe(11)
  });

  test('stores the calculation in a different variable if `storeIn` is provided', async () => {
    iv.node('anything')
      .calculate({ var: 'count', add: 1, storeIn: 'newCount' })

    iv.run('anything');
    await wait();

    expect(iv.variables.count).toBe(10)
    expect(iv.variables.newCount).toBe(11)
  });

  test('add', async () => {
    iv.node('anything')
      .calculate({ var: 'count', add: 1 })

    iv.run('anything');
    await wait();

    expect(iv.variables.count).toBe(11)
  });

  test('subtract', async () => {
    iv.node('anything')
      .calculate({ var: 'count', subtract: 1 })

    iv.run('anything');
    await wait();

    expect(iv.variables.count).toBe(9)
  });

  test('multiply', async () => {
    iv.node('anything')
      .calculate({ var: 'count', multiply: 10 })

    iv.run('anything');
    await wait();

    expect(iv.variables.count).toBe(100)
  });

  test('divide', async () => {
    iv.node('anything')
      .setVariable({ storeIn: 'count', value: 5 })
      .calculate({ var: 'count', divide: 2 })

    iv.run('anything');
    await wait();

    expect(iv.variables.count).toBe(2.5)
  });

  test('it throws with options object with unexpected properties', async () => {
    const setup = () => iv.node('anything')
      .calculate({ var: 'count', make: 1, storeIn: 'count' } as any);

    expect(setup).toThrow();
  });

  test('it throws for options object without "var" prop', async () => {
    const setup = () => iv.node('anything')
      .calculate({ storeIn: 'count', add: 1 } as any);

    expect(setup).toThrow();
  });

  test('it throws for options object without an operation', async () => {
    const setup = () => iv.node('anything')
      .calculate({ var: 'count', storeIn: 'something' } as any);

    expect(setup).toThrow();
  });

  test('it throws for options object with more than one oepration', async () => {
    const setup = () => iv.node('anything')
      .calculate({ var: 'count', add: 1, subtract: 1 });

    expect(setup).toThrow();
  });
})

