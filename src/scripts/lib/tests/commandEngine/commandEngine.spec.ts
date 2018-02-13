import { IvCommandEngine, createEngine, TargetFunctionFactory, TargetFunctionFactoryInput, ctor } from '../../commandEngine';
import { create } from '../../../../test-support/factories';

jest.mock('../../commandEngine/commandRunner');
import { CommandRunner } from '../../commandEngine/commandRunner';


function createTestEngine(overrides: Partial<ctor> = {}) {
  const defaults: ctor = {
    baseContainer: document.getElementById('IV-view'),
    nodes: [],
    variables: { name: 'Don', count: 4 },
    commandRunnerClass: CommandRunner,
  }
  const settings = Object.assign({}, defaults, overrides) as ctor
  return createEngine(settings)
}

function createFunctionFactory(name: string, func?: Runner.TargetFunction): {
  factory: jest.Mock<TargetFunctionFactory>,
  object: Runner.TargetFunctionObject,
  targetFunction: jest.Mock
} {
  const defaultFunction = (cmd) => Promise.resolve({ value: `you ran the "${name}" command` });
  const theFunction = func || defaultFunction;
  const object: Runner.TargetFunctionObject = {}
  object[name] = jest.fn(theFunction);
  
  const factory = jest.fn<TargetFunctionFactory>(function (input?: TargetFunctionFactoryInput): Runner.TargetFunctionObject {
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
    const engine = createTestEngine();
    const {factory, object} = createFunctionFactory('test')
    
    engine.registerTargetFunction(factory)
    engine.run();

    expect(CommandRunner).toHaveBeenCalledTimes(1)
    expect(CommandRunner).toHaveBeenCalledWith({targetFunctions: object, commands: []});
  })

  test('it runs the first command of the first node', () => {
    const node = create('node', { commands: [{ name: 'test' }] })
    const engine = createTestEngine({nodes: [node]});
    const { factory, targetFunction } = createFunctionFactory('test')

    engine.registerTargetFunction(factory)
    engine.run();

    expect(targetFunction).toHaveBeenCalledWith({ name: 'test' })
  })

  test('it gives the correct env to the function factories', () => {
    const nodes = [
      create('node', { commands: [{ name: 'test' }] }),
      create('node', { commands: [{ name: 'test' }] })
    ]
    const baseContainer = document.getElementById('IV-view')
    const variables = {one: 1, two: 'the second'}
    const engine = createTestEngine({nodes, baseContainer, variables});
    const { factory } = createFunctionFactory('test')

    engine.registerTargetFunction(factory)
    engine.run();

    const firstCall = factory.mock.calls[0][0];
    expect(firstCall.nodes).toEqual(nodes)
    expect(firstCall.baseContainer).toEqual(baseContainer)
    expect(firstCall.variables).toEqual(variables)
  })
})
