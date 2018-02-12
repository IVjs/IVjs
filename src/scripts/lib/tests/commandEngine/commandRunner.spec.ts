import { CommandRunner } from '../../commandEngine/commandRunner';
import { create } from '../../../../test-support/factories';

function createCommandRunnerInput(commands: {signature: Runner.Command, func: Function}[]) {
  return commands.reduce((a, { signature, func }) => {
    a.commands.push(signature);
    a.targetFunctions[signature.name] = func;
    return a;
  },{commands: [], targetFunctions: {}})
}

function createSimpleCommandRunnerInput(...objs: object[]) {
  const input = [];
  objs.forEach(obj =>{
    for (let name in obj) {
      const signature = {name};
      const func = obj[name];
      input.push({signature, func});
    }
  })
  return createCommandRunnerInput(input);
}

function cmdReturnFromFunc(fn: Function): Runner.TargetFunction {
  return async (input) => {
    const val = await fn(input);
    return {
      value: val
    }
  }
}

function cmdFnMock(...args) {
  const mock = jest.fn(...args)
  return [cmdReturnFromFunc(mock), mock]
}

function wait(time: number) {
  return new Promise(res => {
    setTimeout(res, time);
  })
}

describe('command runner', () => {
  describe('running', () => {
    test('it runs a registered command', () => {
      const [sayHello, mock] = cmdFnMock();
      const input = createSimpleCommandRunnerInput({ sayHello });
      const runner = new CommandRunner(input);

      runner.run();

      expect(mock).toHaveBeenCalledWith({ name: 'sayHello' });
    })

    test('it runs two registered commands', () => {
      const [sayHello, mock] = cmdFnMock();
      const input = createSimpleCommandRunnerInput(
        {sayHello},
        {sayHello},
      );
      const runner = new CommandRunner(input);

      runner.run();
      setTimeout(() => {
        expect(mock).toHaveBeenCalledTimes(2);
      })
    })

    test('it runs the next command only after the previous promise fulfills', async () => {
      const [sayHello, mock] = cmdFnMock(() => wait(30));
      const input = createSimpleCommandRunnerInput({ sayHello });
      input.commands = input.commands.concat(input.commands);
      const runner = new CommandRunner(input);

      runner.run();

      expect(mock).toHaveBeenCalledTimes(1);
      await wait(10)
      expect(mock).toHaveBeenCalledTimes(1);
      await wait(20)
      expect(mock).toHaveBeenCalledTimes(2);
    })

    test('it emits a done event when complete', async () => {
      const [sayHello] = cmdFnMock();
      const mock = jest.fn();
      const input = createSimpleCommandRunnerInput({ sayHello });
      const runner = new CommandRunner(input);

      runner.on('done', () => mock('done'));
      runner.run();
      await wait(1)

      expect(mock).toHaveBeenCalledWith('done');
    })
  })
})
