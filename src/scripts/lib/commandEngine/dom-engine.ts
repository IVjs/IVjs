import { createEngine } from './command-engine';
import { CommandRunner } from './commandRunner';

import * as dom from './dom-commands/';
import * as any from './generalCommands';

const factories: CommandEngine.TargetFunctionFactory[] = [
  dom.videoPlayFactory,
  dom.goToNodeFactory,
  dom.stopExecutionFactory,
  dom.audioSourceFactory,
  dom.audioVolumeFactory,
  any.assignVariableFactory,
  any.assignFromVariableFactory,
  any.getRandomNumberFactory,
  any.switchFactory,
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