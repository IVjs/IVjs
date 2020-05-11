import {
  CommandBuilderContext,
  CommandHandlerInitializer,
  CommandHandlerRegistrationObject,
} from '../../../plugin-types';

export const removeDragTargetFactory: CommandHandlerInitializer = (input): CommandHandlerRegistrationObject => {
  return {
    removeDragTarget: async (cmd: ICommand.RemoveDragTarget) => {
      const itemWithSameId = document.getElementById(`${cmd.id}`);
      if (itemWithSameId) {
        itemWithSameId.remove();
      }
      return Promise.resolve({});
    },
  };
};

export const removeDragTarget: RemoveDragObjects['removeDragTarget'] = function(
  this: CommandBuilderContext,
  id: string,
): void {
  const cmd: ICommand.RemoveDragTarget = {
    name: 'removeDragTarget',
    id,
  };
  this.pushCommands(cmd);
};

export const removeDragItemFactory: CommandHandlerInitializer = (input): CommandHandlerRegistrationObject => {
  return {
    removeDragItem: async (cmd: ICommand.RemoveDragItem) => {
      const itemWithSameId = document.getElementById(`${cmd.id}`);
      if (itemWithSameId) {
        itemWithSameId.remove();
      }
      return Promise.resolve({});
    },
  };
};

export const removeDragItem: RemoveDragObjects['removeDragItem'] = function(
  this: CommandBuilderContext,
  id: string,
): void {
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
