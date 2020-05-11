import {
  CommandBuilderContext,
  CommandHandlerInitializer,
  CommandHandlerRegistrationObject,
} from '../../../plugin-types';
import interact from 'interactjs';

export interface AddDragItemInstructions {
  id: string;
  image: string;
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  z?: number;
}

function dragMoveListener(event) {
  const { target, dx, dy } = event;
  // keep the dragged position in the data-x/data-y attributes
  const x = (parseFloat(target.getAttribute('data-x')) || 0) + dx;
  const y = (parseFloat(target.getAttribute('data-y')) || 0) + dy;

  // translate the element
  target.style.webkitTransform = target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';

  // update the posiion attributes
  target.setAttribute('data-x', x);
  target.setAttribute('data-y', y);
}

export const addDragItemFactory: CommandHandlerInitializer = (input): CommandHandlerRegistrationObject => {
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
    addDragItem: async (cmd: ICommand.AddDragItem) => {
      const itemWithSameId = dndContainer.querySelector(`#${cmd.id}`);
      if (itemWithSameId) {
        console.warn(
          `You added a drag item with an id ("${cmd.id}") that is already in use in the dom. Removing the previous ${
            cmd.id
          } to make room for the new.`,
        );
        itemWithSameId.remove();
      }
      const img = new Image();
      img.id = cmd.id;
      img.src = cmd.imageUrl;
      img.style.touchAction = 'none';
      img.style.position = 'absolute';
      if (cmd.size && cmd.size.width) {
        img.width = input.settings.baseContainer.querySelector('video').clientWidth * (cmd.size.width / 100);
      }
      if (cmd.size && cmd.size.height) {
        img.height = input.settings.baseContainer.querySelector('video').clientHeight * (cmd.size.height / 100);
      }
      if (cmd.x) {
        img.style.left = cmd.x.toString() + 'px';
      }
      if (cmd.y) {
        img.style.top = cmd.y.toString() + 'px';
      }
      if (cmd.z) {
        img.style.zIndex = cmd.z.toString();
      }
      interact(img).draggable({
        onmove: dragMoveListener,
      });
      dndContainer.append(img);
      return Promise.resolve({});
    },
  };
};

export interface AddDragItem {
  addDragItem(settings: AddDragItemInstructions);
}

export const addDragItem: AddDragItem['addDragItem'] = function(
  this: CommandBuilderContext,
  settings?: AddDragItemInstructions,
): void {
  const { id, image, height, width, x, y, z } = settings;
  this.pushCommands({
    name: 'addDragItem',
    id,
    imageUrl: image,
    x,
    y,
    z,
    size: height || width ? { height, width } : undefined,
  });
};
