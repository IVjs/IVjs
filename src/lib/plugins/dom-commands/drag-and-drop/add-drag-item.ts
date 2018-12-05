import { IvNode } from '../../../node';
import interact from 'interactjs';

interface AddDragItemInstructions {
  id: string;
  image: string;
  width?: number;
  height?: number;
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

export const addDragItemFactory: CommandEngine.TargetFunctionFactory = (input): Runner.TargetFunctionObject => {
  const baseEl = input.settings.baseContainer as HTMLElement;

  return {
    addDragItem: async (cmd: ICommand.AddDragItem) => {
      const itemWithSameId = baseEl.querySelector(`#${cmd.id}`);
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
      if (cmd.size && cmd.size.width) {
        img.width = baseEl.querySelector('video').clientWidth * (cmd.size.width / 100);
      }
      if (cmd.size && cmd.size.height) {
        img.height = baseEl.querySelector('video').clientHeight * (cmd.size.height / 100);
      }
      interact(img).draggable({
        onmove: dragMoveListener,
      });
      baseEl.append(img);
      return Promise.resolve({});
    },
  };
};

export interface AddDragItem {
  addDragItem(settings: AddDragItemInstructions);
}

export const addDragItem: AddDragItem['addDragItem'] = function(
  this: IvNode,
  settings?: AddDragItemInstructions,
): void {
  const { id, image, height, width } = settings;
  this.pushCommands({
    name: 'addDragItem',
    id,
    imageUrl: image,
    size: { height, width },
  });
};
