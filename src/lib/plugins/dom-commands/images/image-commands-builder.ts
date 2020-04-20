import { isContext } from 'vm';

export interface ImageOptions {
  id: string;
  url: string;
  x: number;
  y: number;
  w: number;
  h: number;
  r: number;
  layer: number;
  goToNode?: string;
  runAsync?: string;
  remove?: boolean;
  js?: () => any;
  transition?: number;
}

export class ImageCommandsBuilder {
  public addImage(input: ImageOptions) {
    const { id, url, transition, layer } = input;
    const cmd: ICommand.AddImage = {
      name: 'addImage',
      id,
      url,
      rotation: input.r,
      transition,
      layer,
      position: {
        x: input.x,
        y: input.y,
      },
      size: {
        width: input.w,
        height: input.h,
      },
      onClick: this.createCommands(input),
    };
    return cmd;
  }

  public removeImage(input: { id: string; transition?: number }): ICommand.RemoveImage {
    const cmd: ICommand.RemoveImage = {
      name: 'removeImage',
      id: input.id,
      transition: input.transition,
    };
    return cmd;
  }

  public removeAllImages(transition?: number): ICommand.RemoveAllImages {
    return {
      name: 'removeAllImages',
      transition,
    };
  }

  private createCommands(input: ImageOptions): ICommand.AnyCommand[] {
    const { runAsync, goToNode, js, remove, id } = input;
    const commands: ICommand.AnyCommand[] = [];

    if (runAsync) {
      commands.push({
        name: 'executeAsync',
        nodeName: runAsync,
      });
    }
    if (js) {
      commands.push({
        name: 'executeJs',
        func: js,
      });
    }
    if (remove) {
      commands.push({
        name: 'removeImage',
        id,
      });
    }
    if (goToNode) {
      commands.push(
        {
          name: 'goToNode',
          nodeName: goToNode,
        },
        {
          name: 'stopExecution',
        },
      );
    }

    return commands;
  }
}
