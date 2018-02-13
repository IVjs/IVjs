import { IvCommandEngine, createEngine, TargetFunctionFactory, TargetFunctionFactoryInput } from '../../commandEngine';
import { create } from '../../../../test-support/factories';

jest.mock('../../commandEngine/commandRunner');
import { CommandRunner } from '../../commandEngine/commandRunner';


function createTestEngine(nodes: IvNode[] = []) {
  return createEngine({
    baseContainer: document.getElementById('IV-view'),
    nodes,
    variables: {name: 'Don', count: 4},
    commandRunnerClass: CommandRunner,
  })
}

function createFunctionFactory(name: string, func?: Runner.TargetFunction): {
  factory: TargetFunctionFactory,
  object: Runner.TargetFunctionObject,
  targetFunction: jest.Mock
} {
  const defaultFunction = (cmd) => Promise.resolve({ value: `you ran the "${name}" command` });
  const theFunction = func || defaultFunction;
  const object: Runner.TargetFunctionObject = {}
  object[name] = jest.fn(theFunction);
  
  const factory = function (input?: TargetFunctionFactoryInput): Runner.TargetFunctionObject {
    return object;
  }

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
  return createTestEngine([node])
}

beforeEach(() => {
  (CommandRunner as any).mockClear();
})

describe('Command Engine', () => {
  test('it passes registered commands to the runner', () => {
    const engine = createTestEngine();
    const {factory, object} = createFunctionFactory('test')
    
    engine.registerTargetFunction(factory)
    engine.run();

    expect(CommandRunner).toHaveBeenCalledTimes(1)
    expect(CommandRunner).toHaveBeenCalledWith({targetFunctions: object, commands: []});
  })

  test('it runs the first command of the first node', () => {
    const node = create('node', { commands: [{ name: 'test' }] })
    const engine = createTestEngine([node]);
    const { factory, targetFunction } = createFunctionFactory('test')

    engine.registerTargetFunction(factory)
    engine.run();

    expect(targetFunction).toHaveBeenCalledWith({ name: 'test' })
  })
})
