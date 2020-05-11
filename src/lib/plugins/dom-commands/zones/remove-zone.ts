import {
  CommandBuilderContext,
  CommandHandlerInitializer,
  CommandHandlerRegistrationObject,
} from '../../../plugin-types';

export const removeDragTargetFactory: CommandHandlerInitializer = (input): CommandHandlerRegistrationObject => {
  return {
    removeZone: async (cmd: ICommand.RemoveZone) => {
      const itemWithSameId = document.getElementById(`${cmd.id}`);
      if (itemWithSameId) {
        itemWithSameId.remove();
      }
      return Promise.resolve({});
    },
  };
};

export const removeZone: RemoveZone['removeZone'] = function(this: CommandBuilderContext, id: string): void {
  const cmd: ICommand.RemoveZone = {
    name: 'removeZone',
    id,
  };
  this.pushCommands(cmd);
};

export interface RemoveZone {
  removeZone(zoneId: string);
}
