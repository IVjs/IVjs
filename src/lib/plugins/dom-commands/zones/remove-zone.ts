import { IvNode } from '../../../node';

export const removeDragTargetFactory: CommandEngine.TargetFunctionFactory = (input): Runner.TargetFunctionObject => {
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

export const removeZone: RemoveZone['removeZone'] = function(this: IvNode, id: string): void {
  const cmd: ICommand.RemoveZone = {
    name: 'removeZone',
    id,
  };
  this.pushCommands(cmd);
};

export interface RemoveZone {
  removeZone(zoneId: string);
}
