import { create, createMockEngine, createMockRunner, wait } from '../../../../test-support';
import { waitFactory } from './wait';

describe('wait factory', () => {
  test('it produces a valid TFO', () => {
    const tfo = waitFactory({
      settings: create('ivSettings'),
      commandEngine: createMockEngine(),
      variables: {},
    });

    expect(tfo).toHaveProperty('wait');
    expect(typeof tfo.wait).toEqual('function');
  });

  test('it returns after the specified time', async () => {
    const tfo = waitFactory({
      settings: create('ivSettings'),
      commandEngine: createMockEngine(),
      variables: {},
    });

    const command: ICommand.Wait = create('waitCommand', { time: 10 });
    const theReturn = tfo.wait(command);
    let returnFired = false;
    theReturn.then(() => (returnFired = true));

    await wait(5);
    expect(returnFired).toEqual(false);
    await wait(5);
    expect(returnFired).toEqual(true);
  });
});
