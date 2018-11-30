import { IvNode } from '../../../node';

interface AddDragItemInstructions {
  id: string;
  image: string;
  size?: {
    width?: number;
    height?: number;
  };
}

export const addDragItemFactory: CommandEngine.TargetFunctionFactory = (input): Runner.TargetFunctionObject => {
  const baseEl = input.settings.baseContainer as HTMLElement;

  return {
    addDragItem: async (cmd: ICommand.AddDragItem) => {
      const img = new Image();
      img.src = cmd.imageUrl;
      if (cmd.size && cmd.size.width) {
        img.width = baseEl.querySelector('video').clientWidth * (cmd.size.width / 100);
      }
      if (cmd.size && cmd.size.height) {
        img.height = baseEl.querySelector('video').clientHeight * (cmd.size.height / 100);
      }
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
  const { id, image, size } = settings;
  this.pushCommands({
    name: 'addDragItem',
    id,
    imageUrl: image,
    size,
  });
};
