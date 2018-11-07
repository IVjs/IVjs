import { create, getAudioPlayerNamed, getCurrentVideo, simulateLoadedNextVideo, simulatePlayThroughNextVideo, wait } from '../../test-support';
import { IV } from './iv';

describe('testing for errors', () => {
  let iv: IV;
  beforeEach(() => iv = new IV())

  test('does not hang when returning to a node which previously ended with "goto"', async () => {
    /*
      There was once the concept in a runner of `shouldRun`. This state not getting properly reset
      caused this error. This was fixed. Subsequently, `shouldRun` was removed in favor of inferring
      from the current status (running, waiting, etc) of the runner.
    */
    iv.variables = { count: 0 }
    iv.node('anything')
      .calculate({ storeIn: 'count', add: 1, var: 'count' })
      .goto('anything else')

    iv.node('anything else')
      .calculate({ storeIn: 'count', add: 1, var: 'count' })
      .playVideo({ url: 'any.mp4', goTo: 'anything' })

    iv.run('anything');
    await wait();
    simulatePlayThroughNextVideo();
    await wait();

    expect(iv.variables.count).toBeGreaterThan(2)
  });

  test('does not hang when goto is too quick', async () => {
    /*
      This error came about because of a race condition. The former node had not yet finished
      executing when the run method was called again. This effectively did nothing.

      Now calls to run() are enqueued if the node is already running or waiting
    */
    iv.variables = { count: 0 }
    iv.node('first')
      .goto('second')

    iv.node('second')
      .calculate({ storeIn: 'count', add: 1, var: 'count' })
      .if({var: 'count', isLessThan: 5})
        // .setVariable({storeIn: 'meh', value: 'meh'})  // This line makes the test pass. It should pass without it.
        .goto('first')
      .else()
        .setVariable({storeIn: 'worked', value: 'true'})
      .endIf()

    iv.run('first');
    await wait(10);

    expect(iv.variables.worked).toEqual('true')
  });



})
