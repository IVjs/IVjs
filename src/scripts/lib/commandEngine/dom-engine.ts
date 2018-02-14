import { createEngine } from './command-engine';
import { CommandRunner } from './commandRunner';

import { videoPlayFactory } from './dom-commands/video-play'

const factories: CommandEngine.TargetFunctionFactory[] = [
  videoPlayFactory,
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