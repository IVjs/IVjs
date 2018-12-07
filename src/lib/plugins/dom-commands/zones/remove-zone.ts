import { CommandBuilderContext } from '../../../plugin-types';

export const removeDragTargetFactory: CommandEngine.CommandHandlerInitializer = (
  input,
): Runner.CommandHandlerRegistrationObject => {
  const videoParent = input.settings.baseContainer.querySelector('video').parentElement as HTMLElement;

  return {
    removeZone: async (cmd: ICommand.RemoveZone) => {
      const itemWithSameId = videoParent.querySelector(`#${cmd.id}`);
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
