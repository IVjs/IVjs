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
      baseEl.append(img);
      return Promise.resolve({});
    },
  };
};

export interface AddDragItem {
  addDragItem(instructions: AddDragItemInstructions);
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
