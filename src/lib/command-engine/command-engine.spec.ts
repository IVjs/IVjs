import { create } from '../../test-support';
import { createEngine } from './create-engine';

jest.mock('./command-runner');
import { CommandRunner } from './command-runner';

function createTestEngine(overrides: Partial<CommandEngine.ctor> = {}) {
  const defaults: CommandEngine.ctor = {
    settings: create('ivSettings'),
    nodes: [create('node')],
    variables: { name: 'Don', count: 4 },
    commandRunnerClass: CommandRunner,
  };
  const settings: CommandEngine.ctor = { ...defaults, ...overrides };
  return createEngine(settings);
}

function createFunctionFactory(
  name: string,
  func?: Runner.CommandHandler,
): {
  factory: jest.Mock<CommandEngine.CommandHandlerInitializer>;
  object: Runner.CommandHandlerRegistrationObject;
  targetFunction: jest.Mock;
} {
  const defaultFunction = cmd => Promise.resolve({ value: `you ran the "${name}" command` });
  const theFunction = func || defaultFunction;
  const object: Runner.CommandHandlerRegistrationObject = {};
  object[name] = jest.fn(theFunction);

  const factory = jest.fn<CommandEngine.CommandHandlerInitializer>(
    (input?: CommandEngine.InitializerState): Runner.CommandHandlerRegistrationObject => object,
  );

  return {
    factory,
    object,
    targetFunction: object[name] as jest.Mock<Runner.CommandHandler>,
  };
}

beforeEach(() => {
  (CommandRunner as any).mockClear();
});

describe('Command Engine', () => {
  test('it passes registered commands to the runner', () => {
    const { factory, object } = createFunctionFactory('test');
    const engine = createTestEngine({
      variables: { name: 'Don', count: 4 },
    });

    engine.registerTargetFunction(factory);
    engine.run();

    expect(CommandRunner).toHaveBeenCalledTimes(1);
    expect(CommandRunner).toHaveBeenCalledWith({
      targetFunctions: object,
      variables: { name: 'Don', count: 4 },
      commands: [],
    });
  });

  test('it calls the runner for the first node', () => {
    const mockRun = jest.fn();
    (CommandRunner as jest.Mock<CommandRunner>).mockImplementation(input => {
      return {
        run() {
          mockRun();
        },
      };
    });

    const engine = createTestEngine();
    const { factory, targetFunction } = createFunctionFactory('test');

    engine.registerTargetFunction(factory);
    engine.run();

    expect(mockRun).toHaveBeenCalled();
  });

  test('it gives the correct env to the function factories', () => {
    const settings = create('ivSettings');
    const variables = { one: 1, two: 'the second' };
    const engine = createTestEngine({ settings, variables });
    const { factory } = createFunctionFactory('test');

    engine.registerTargetFunction(factory);
    engine.run();

    const firstCall = factory.mock.calls[0][0];
    expect(firstCall.commandEngine).toEqual(engine);
    expect(firstCall.settings).toEqual(settings);
    expect(firstCall.variables).toEqual(variables);
  });
});
