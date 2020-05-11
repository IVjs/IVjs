import {
  CommandBuilderContext,
  CommandHandlerInitializer,
  CommandHandlerRegistrationObject,
} from '../../../plugin-types';
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
  onSuccess?: OnSuccessOptions;
}

export type OnSuccessOptions = Partial<{
  js: () => void;
  setVariable: string;
  goToNode: string;
  keepItem: boolean;
}>;

export const addDragTargetFactory: CommandHandlerInitializer = (input): CommandHandlerRegistrationObject => {
  let dndContainer: HTMLElement = document.getElementById('IV-dnd-container');

  if (!dndContainer) {
    dndContainer = document.createElement('div');
    dndContainer.id = 'IV-dnd-container';
    dndContainer.style.zIndex = '40';
    dndContainer.style.top = '0';
    dndContainer.style.left = '0';
    dndContainer.style.position = 'absolute';
    document.getElementById('IV-view').appendChild(dndContainer);
  }

  return {
    addDragTarget: async (cmd: ICommand.AddDragTarget) => {
      const itemWithSameId = dndContainer.querySelector(`#${cmd.id}`);
      if (itemWithSameId) {
        console.warn(
          `You added a drag target with an id ("${cmd.id}") that is already in use in the dom. Removing the previous ${
            cmd.id
          } to make room for the new.`,
        );
        itemWithSameId.remove();
      }

      const target = document.createElement('div');
      const video = videoController.getCurrentPlayer();

      target.id = cmd.id;
      target.style.width = video.clientWidth * (cmd.size.width / 100) + 'px';
      target.style.height = video.clientHeight * (cmd.size.height / 100) + 'px';
      target.style.position = 'absolute';
      target.style.top = video.offsetTop + (cmd.position.y / 100) * video.clientHeight + 'px';
      target.style.left = video.offsetLeft + (cmd.position.x / 100) * video.clientWidth + 'px';
      target.style.border = cmd.visible ? '2px solid blue' : target.style.border;
      dndContainer.append(target);

      interact(target).dropzone({
        accept: cmd.acceptDragItems ? '#' + cmd.acceptDragItems.join() : null,
        overlap: 'center',
        ondragenter(event) {
          event.target.style.borderColor = 'green';
        },
        ondragleave(event) {
          event.target.style.borderColor = 'blue';
        },
        ondrop(event) {
          const { js, setVariable, goToNode, keepItem } = (cmd.onSuccess || {}) as OnSuccessOptions;
          if (setVariable) {
            input.variables[setVariable] = event.relatedTarget.id;
          }
          if (js) {
            js();
          }
          if (goToNode) {
            input.commandEngine.runNodeByName(goToNode);
          }
          if (!keepItem) {
            event.relatedTarget.remove();
          }
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
  this: CommandBuilderContext,
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
