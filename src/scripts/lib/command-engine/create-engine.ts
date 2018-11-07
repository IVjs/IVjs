import { IvCommandEngine } from './command-engine';
import { CommandRunner } from './command-runner';
import { switchFactory } from './switch';

export function createEngine(engineConstructorInput: CommandEngine.ctor, ...functionFactories) {
  const { settings, nodes, variables, commandRunnerClass } = engineConstructorInput;
  const engine = new IvCommandEngine(settings, nodes, commandRunnerClass, variables);
  
  functionFactories.forEach(factory => {
    engine.registerTargetFunction(factory);
  })

  return engine;
}

export function createBaseEngine(engineConstructorInput: Omit<CommandEngine.ctor, 'commandRunnerClass'>, ...functionFactories) {
  const { settings, nodes, variables } = engineConstructorInput;
  const engine = createEngine({settings, nodes, variables, commandRunnerClass: CommandRunner}, ...functionFactories);
  
  engine.registerTargetFunction(switchFactory) // This powers the if statements that are necessary for base-node
  
  return engine;
}
