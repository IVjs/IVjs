import { IvDomCommandEngine } from '../../commandEngine';
import { create } from '../../../../test-support/factories';

jest.mock('../../commandEngine/commandRunner');
import { CommandRunner } from '../../commandEngine/commandRunner';


function createEngine(nodes: IvNode[] = []) {
  return new IvDomCommandEngine(
    document.getElementById('IV-view'),
    nodes,
    CommandRunner
  )
}

function createNode(commands: ICommand.AnyCommand[] = []) {
  return create('node', { commands });
}

function createEngineWithCommands(commands: ICommand.AnyCommand[] = []) {
  const node = createNode(commands);
  return createEngine([node])
}

beforeEach(() => {
  (CommandRunner as any).mockClear();
})

describe('runner instanciation', () => {
  test('it passes registered commands to the runner', () => {
    const engine = createEngine();
    const targetFunctions: Runner.TargetFunctionObject = {sayHello: () => Promise.resolve({value: null})}
    const commands = [];
    
    engine.registerTargetFunctions(targetFunctions)
    engine.run();

    expect(CommandRunner).toHaveBeenCalledTimes(1)
    expect(CommandRunner).toHaveBeenCalledWith({targetFunctions, commands});
  })
})
