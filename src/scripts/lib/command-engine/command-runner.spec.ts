import { CommandRunner } from './command-runner';
import { create, wait } from '../../../test-support';

function createCommandRunnerInput(commands: {signature: Runner.Command, func: Function}[]): Runner.ConstructorInput {
  return commands.reduce((a, { signature, func }) => {
    a.commands.push(signature);
    a.targetFunctions[signature.name] = func;
    return a;
  },{commands: [], targetFunctions: {}, variables: {}})
}

function createSimpleCommandRunnerInput(...objs: object[]): Runner.ConstructorInput {
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
    await fn(input);
    return {}
  }
}

function cmdFnMock(...args) {
  const mock = jest.fn(...args)
  return [cmdReturnFromFunc(mock), mock]
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

    test('it replaces variables before issuing a command', async () => {
      const [sayAnything, mock] = cmdFnMock();
      const input = {
        targetFunctions: { sayAnything },
        commands: [{ name: 'sayAnything', anything: 'I am saying "{{myVar}}"' }],
        variables: { myVar: 'Goodbye' },
      }
      const runner = new CommandRunner(input);

      runner.run();

      expect(mock).toHaveBeenCalledWith({ name: 'sayAnything', anything: 'I am saying "Goodbye"' });
    })

    test('it replaces variables recusrsively before issuing a command', async () => {
      const [sayAnything, mock] = cmdFnMock();
      const input = {
        targetFunctions: { sayAnything },
        commands: [{ name: 'sayAnything', anything: {
          prefix: 'I am saying', message: '"{{myVar}}"'
        }}],
        variables: { myVar: 'Goodbye' },
      }
      const runner = new CommandRunner(input);

      runner.run();

      expect(mock).toHaveBeenCalledWith({
        name: 'sayAnything',
        anything: {
          prefix: 'I am saying', message: '"Goodbye"'
        }
      });
    })
  })

  describe('returned commands', () => {
    test('it runs returned commands', async () => {
      const [sayGoodbye, mock2] = cmdFnMock();
      const sayHello = jest.fn(async () => ({
        value: 'hello',
        commands: [{ name: 'sayGoodbye' }],
      }));
      const input = {
        targetFunctions: { sayHello, sayGoodbye },
        commands: [{ name: 'sayHello' }],
        variables: {},
      }
      const runner = new CommandRunner(input);

      runner.run();
      await wait();

      expect(mock2).toHaveBeenCalled();
    })
  })

  describe('emitting', () => {
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

  describe('ayncCommands', () => {
    test('it kicks off async commands and moves on', async () => {
      const [sayGoodDay] = cmdFnMock();
      const [sayGoodBye, mock2] = cmdFnMock();
      const asyncCommands = async () => {
        await wait(2);
        return [{ name: 'sayGoodBye' }];
      };
      const sayHello = jest.fn(async () => ({
        value: 'hello',
        asyncCommands: asyncCommands(),
        commands: [{name: 'sayGoodDay'}]
      }));
      const input = {
        targetFunctions: { sayHello, sayGoodDay, sayGoodBye },
        commands: [{ name: 'sayHello' }],
        variables: {},
      }
      const runner = new CommandRunner(input);

      runner.run();

      await wait(1);
      expect(mock2).not.toHaveBeenCalled();

      await wait(1);
      expect(mock2).toHaveBeenCalled();
    });
  })

  describe('requests', () => {
    describe('exit', () => {
      test('it stops executing the current thread', async () => {
        const [sayGoodbye, mock2] = cmdFnMock();
        const sayHello = jest.fn(async () => ({
          requests: ['exit'],
        }));
        const input = {
          targetFunctions: { sayHello, sayGoodbye },
          commands: [{ name: 'sayHello' }, { name: 'sayGoodbye' }],
          variables: {},
        }
        const runner = new CommandRunner(input);

        runner.run();
        await wait();

        expect(mock2).not.toHaveBeenCalled();
      });

      test('it fires the "done" event', async () => {
        const sayHello = jest.fn(async () => ({
          requests: ['exit'],
        }));
        const input = {
          targetFunctions: { sayHello },
          commands: [{ name: 'sayHello' }],
          variables: {},
        }
        const mock = jest.fn();
        const runner = new CommandRunner(input);

        runner.on('done', () => mock());
        runner.run();
        await wait();

        expect(mock).toHaveBeenCalled();
      });
    });

    describe('pause', () => {
      test('it stops executing the current thread', async () => {
        const [sayGoodbye, mock2] = cmdFnMock();
        const sayHello = jest.fn(async () => ({
          requests: ['pause'],
        }));
        const input = {
          targetFunctions: { sayHello, sayGoodbye },
          commands: [{ name: 'sayHello' }, { name: 'sayGoodbye' }],
          variables: {},
        }
        const runner = new CommandRunner(input);

        runner.run();
        await wait();

        expect(mock2).not.toHaveBeenCalled();
      });

      test('it fires the "paused" event', async () => {
        const sayHello = jest.fn(async () => ({
          requests: ['pause'],
        }));
        const input = {
          targetFunctions: { sayHello },
          commands: [{ name: 'sayHello' }],
          variables: {},
        }
        const mock = jest.fn();
        const runner = new CommandRunner(input);

        runner.on('paused', () => mock());
        runner.run();
        await wait();

        expect(mock).toHaveBeenCalled();
      });

      test('it continues where it left off if called again', async () => {
        const sayHello = jest.fn(async () => ({
          requests: ['pause'],
        }));
        const [sayGoodbye, sayGoodbyeMock] = cmdFnMock();
        const input = {
          targetFunctions: { sayHello, sayGoodbye },
          commands: [{ name: 'sayHello' }, { name: 'sayGoodbye'}],
          variables: {},
        }

        const runner = new CommandRunner(input);

        runner.run();
        await wait();
        expect(sayGoodbyeMock).not.toHaveBeenCalled();

        runner.run();
        await wait();
        expect(sayGoodbyeMock).toHaveBeenCalledTimes(1);
        expect(sayHello).toHaveBeenCalledTimes(1);
      });
    });
  })
})
