import { IvNode } from '../../../node';

export const goToNodeFactory: CommandEngine.CommandHandlerInitializer = (input): Runner.TargetFunctionObject => {
  return {
    goToNode: (cmd: ICommand.GoToNode) => {
      input.commandEngine.runNodeByName(cmd.nodeName);
      return Promise.resolve({});
    },
  };
};

export interface AddGoToNode {
  goToNode(nodeName: string);
}

export const goToNode: AddGoToNode['goToNode'] = function(this: IvNode, nodeName: string): void {
  const commands = buildGoToNodeCommandSet(nodeName);
  this.pushCommands(...commands);
};

function buildGoToNodeCommandSet(nodeName: string): [ICommand.GoToNode, ICommand.StopExecution] {
  return [{ name: 'goToNode', nodeName }, { name: 'stopExecution' }];
}
