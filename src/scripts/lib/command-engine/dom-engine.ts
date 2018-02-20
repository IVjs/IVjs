import { createEngine } from './command-engine';
import { CommandRunner } from './command-runner';

import * as dom from './dom-commands';
import * as any from './general-commands';
import * as log from './log-commands';

const factories: CommandEngine.TargetFunctionFactory[] = [
  dom.videoPlayFactory,
  dom.audioSourceFactory,
  dom.audioVolumeFactory,
  any.goToNodeFactory,
  any.stopExecutionFactory,
  any.assignVariableFactory,
  any.assignFromVariableFactory,
  any.getRandomNumberFactory,
  any.calculateFactory,
  any.switchFactory,
  log.logVariablesFactory,
];

export function createDomEngine(input: {
  settings: IV.Settings,
  nodes: IvNode[],
  variables: {[x:string]: any}
}) {
  const { settings, nodes, variables } = input;
  return createEngine({
    commandRunnerClass: CommandRunner,
    settings,
    nodes,
    variables
  }, ...factories)
}