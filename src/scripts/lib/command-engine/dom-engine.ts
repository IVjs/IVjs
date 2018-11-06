import { createEngine } from './command-engine';
import { CommandRunner } from './command-runner';

import * as any from './general-commands';
import * as log from './log-commands';

const factories: CommandEngine.TargetFunctionFactory[] = [
  any.goToNodeFactory,
  any.stopExecutionFactory,
  any.assignVariableFactory,
  any.assignFromVariableFactory,
  any.getRandomNumberFactory,
  any.switchFactory,
  log.logFactory,
  any.pauseExecutionFactory,
  any.executeSyncFactory,
  any.waitFactory,
  any.executeAsyncFactory,
];

export function createDomEngine(input: {
  settings: IV.Settings,
  nodes: BaseNode[],
  variables: {[x:string]: any},
  factories?: CommandEngine.TargetFunctionFactory[],
}) {
  const { settings, nodes, variables, factories: inputFactories } = input;
  const allFactories = factories.concat(inputFactories || []);
  return createEngine({
    commandRunnerClass: CommandRunner,
    settings,
    nodes,
    variables
  }, ...allFactories)
}
