import { IvNode } from '../../../node';

export interface AddDragTargetSettings {
  id: string;
  width: number;
  height: number;
  top: number;
  left: number;
  visible?: boolean;
  acceptDragItems?: string[];
  onSuccess?: {
    setVariable?: string;
    goToNode?: string;
  };
}

export const addDragTargetFactory: CommandEngine.TargetFunctionFactory = (input): Runner.TargetFunctionObject => {
  const baseEl = input.settings.baseContainer as HTMLElement;

  return {
    addDragTarget: async (cmd: ICommand.AddDragTarget) => {
      const target = document.createElement('div');
      const video = baseEl.querySelector('video');
      target.id = cmd.id;
      target.style.width = video.width * (cmd.size.width / 100) + 'px';
      target.style.height = video.height * (cmd.size.height / 100) + 'px';
      target.style.position = 'absolute';
      target.style.border = cmd.visible ? '2px solid blue' : target.style.border;
      baseEl.append(target);
      return Promise.resolve({});
    },
  };
};

export interface AddDragTarget {
  addDragTarget(settings: AddDragTargetSettings);
}

export const addDragTarget: AddDragTarget['addDragTarget'] = function(
  this: IvNode,
  settings?: AddDragTargetSettings,
): void {
  const { id, width, height, top, left, acceptDragItems, onSuccess, visible } = settings;
  const cmd: ICommand.AddDragTarget = {
    name: 'addDragTarget',
    id,
    size: { width, height },
    position: { x: left, y: top },
    acceptDragItems,
    onSuccess,
    visible,
  };
  this.pushCommands(cmd);
};
