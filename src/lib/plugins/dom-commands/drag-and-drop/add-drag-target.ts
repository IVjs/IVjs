import { IvNode } from '../../../node';
import { videoController } from '../video/video-controller';
import interact from 'interactjs';

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
  const videoParent = input.settings.baseContainer.querySelector('video').parentElement as HTMLElement;

  return {
    addDragTarget: async (cmd: ICommand.AddDragTarget) => {
      const target = document.createElement('div');
      const video = videoController.getCurrentPlayer();

      target.id = cmd.id;
      target.style.width = video.clientWidth * (cmd.size.width / 100) + 'px';
      target.style.height = video.clientHeight * (cmd.size.height / 100) + 'px';
      target.style.position = 'absolute';
      target.style.top = video.offsetTop + (cmd.position.y / 100) * video.clientHeight + 'px';
      target.style.left = video.offsetLeft + (cmd.position.x / 100) * video.clientWidth + 'px';
      target.style.border = cmd.visible ? '2px solid blue' : target.style.border;
      videoParent.append(target);

      interact(target).dropzone({
        accept: cmd.acceptDragItems ? '#' + cmd.acceptDragItems.join() : null,
        overlap: 'center',
        ondragenter(event) {
          console.log(event);
          event.target.style.borderColor = 'green';
        },
        ondragleave(event) {
          event.target.style.borderColor = 'blue';
        },
      });
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
