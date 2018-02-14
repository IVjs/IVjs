import { createEngine } from './command-engine';
import { CommandRunner } from './commandRunner';



const factories: CommandEngine.TargetFunctionFactory[] = [];

export function createDomEngine(input: {
  baseContainer: HTMLElement,
  nodes: IvNode[],
  variables: {[x:string]: any}
}) {
  const { baseContainer, nodes, variables } = input;
  return createEngine({
    commandRunnerClass: CommandRunner,
    baseContainer,
    nodes,
    variables
  }, ...factories)
}