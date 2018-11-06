import { IvNode } from '../../node';
import { PluginRegistration } from '../../base-iv';

export const goToNodeFactory: CommandEngine.TargetFunctionFactory = (input): Runner.TargetFunctionObject => {
  return {
    'goToNode': (cmd: ICommand.GoToNode) => {
      input.commandEngine.runNodeByName(cmd.nodeName);
      return Promise.resolve({});
    }
  }
}

function goto(this: IvNode, nodeName: string) : void {
  const commands = buildGoToNodeCommandSet(nodeName);
  this.pushCommands(...commands);
}

function buildGoToNodeCommandSet(nodeName: string): [
  ICommand.GoToNode,
  ICommand.StopExecution
] {
  return [
    { name: 'goToNode', nodeName },
    { name: 'stopExecution' }
  ];
}

export const goToNodeRegistration: PluginRegistration = {
  apiExtensions: [{
    apiName: 'goto',
    apiFn: goto,
  }],
  targetFunctionFactories: [goToNodeFactory],
}

declare module '../../node' {
  interface NodeExtensions {
    goto: typeof goto;
  }
}
