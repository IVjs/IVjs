import { IvCommandEngine, createEngine } from './command-engine';
import { create, wait } from '../../../test-support';

jest.mock('./command-runner');
import { CommandRunner } from './command-runner';

function createTestEngine(overrides: Partial<CommandEngine.ctor> = {}) {
  const defaults: CommandEngine.ctor = {
    settings: create('ivSettings'),
    nodes: [create('node')],
    variables: { name: 'Don', count: 4 },
    commandRunnerClass: CommandRunner,
  }
  const settings = Object.assign({}, defaults, overrides) as CommandEngine.ctor
  return createEngine(settings)
}

function createFunctionFactory(name: string, func?: Runner.TargetFunction): {
  factory: jest.Mock<CommandEngine.TargetFunctionFactory>,
  object: Runner.TargetFunctionObject,
  targetFunction: jest.Mock
} {
  const defaultFunction = (cmd) => Promise.resolve({ value: `you ran the "${name}" command` });
  const theFunction = func || defaultFunction;
  const object: Runner.TargetFunctionObject = {}
  object[name] = jest.fn(theFunction);
  
  const factory = jest.fn<CommandEngine.TargetFunctionFactory>(function (input?: CommandEngine.TargetFunctionFactoryInput): Runner.TargetFunctionObject {
    return object;
  })

  return {
    factory,
    object,
    targetFunction: object[name] as jest.Mock<Runner.TargetFunction>
  }
}

function createNode(commands: ICommand.AnyCommand[] = []) {
  return create('node', { commands });
}

function createEngineWithCommands(commands: ICommand.AnyCommand[] = []) {
  const node = createNode(commands);
  return createTestEngine({nodes: [node]})
}

beforeEach(() => {
  (CommandRunner as any).mockClear();
})

describe('Command Engine', () => {
  test('it passes registered commands to the runner', () => {
    const {factory, object} = createFunctionFactory('test')
    const engine = createTestEngine({
      variables: {name: 'Don', count: 4}
    });
    
    engine.registerTargetFunction(factory)
    engine.run();

    expect(CommandRunner).toHaveBeenCalledTimes(1)
    expect(CommandRunner).toHaveBeenCalledWith({
      targetFunctions: object, 
      variables: { name: 'Don', count: 4 },
      commands: [],
    });
  })

  test('it calls the runner for the first node', () => {
    const mockRun = jest.fn();
    (CommandRunner as jest.Mock<CommandRunner>).mockImplementation((input) => {
      return {
        run() { mockRun() }
      }
    })

    const engine = createTestEngine();
    const { factory, targetFunction } = createFunctionFactory('test')

    engine.registerTargetFunction(factory)
    engine.run();

    expect(mockRun).toHaveBeenCalled()
  })

  test('it gives the correct env to the function factories', () => {
    const settings = create('ivSettings');
    const variables = {one: 1, two: 'the second'}
    const engine = createTestEngine({settings, variables});
    const { factory } = createFunctionFactory('test')

    engine.registerTargetFunction(factory)
    engine.run();

    const firstCall = factory.mock.calls[0][0];
    expect(firstCall.commandEngine).toEqual(engine)
    expect(firstCall.settings).toEqual(settings)
    expect(firstCall.variables).toEqual(variables)
  })
})
