import { IvNode } from '../../../node';

export const removeDragTargetFactory: CommandEngine.CommandHandlerInitializer = (
  input,
): Runner.CommandHandlerRegistrationObject => {
  const videoParent = input.settings.baseContainer.querySelector('video').parentElement as HTMLElement;

  return {
    removeDragTarget: async (cmd: ICommand.RemoveDragTarget) => {
      const itemWithSameId = videoParent.querySelector(`#${cmd.id}`);
      if (itemWithSameId) {
        itemWithSameId.remove();
      }
      return Promise.resolve({});
    },
  };
};

export const removeDragTarget: RemoveDragObjects['removeDragTarget'] = function(this: IvNode, id: string): void {
  const cmd: ICommand.RemoveDragTarget = {
    name: 'removeDragTarget',
    id,
  };
  this.pushCommands(cmd);
};

export const removeDragItemFactory: CommandEngine.CommandHandlerInitializer = (
  input,
): Runner.CommandHandlerRegistrationObject => {
  return {
    removeDragItem: async (cmd: ICommand.RemoveDragItem) => {
      const itemWithSameId = input.settings.baseContainer.querySelector(`#${cmd.id}`);
      if (itemWithSameId) {
        itemWithSameId.remove();
      }
      return Promise.resolve({});
    },
  };
};

export const removeDragItem: RemoveDragObjects['removeDragItem'] = function(this: IvNode, id: string): void {
  const cmd: ICommand.RemoveDragItem = {
    name: 'removeDragItem',
    id,
  };
  this.pushCommands(cmd);
};

export interface RemoveDragObjects {
  removeDragTarget(dragTargetId: string);
  removeDragItem(dragItemId: string);
}
