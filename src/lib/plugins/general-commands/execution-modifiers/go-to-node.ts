import { CommandBuilderContext, CommandHandlerInitializer } from '../../../plugin-types';

export const goToNodeFactory: CommandHandlerInitializer = (input): Runner.CommandHandlerRegistrationObject => {
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

export const goToNode: AddGoToNode['goToNode'] = function(this: CommandBuilderContext, nodeName: string): void {
  const commands = buildGoToNodeCommandSet(nodeName);
  this.pushCommands(...commands);
};

function buildGoToNodeCommandSet(nodeName: string): [ICommand.GoToNode, ICommand.StopExecution] {
  return [{ name: 'goToNode', nodeName }, { name: 'stopExecution' }];
}
