import {
  CommandBuilderContext,
  CommandHandlerInitializer,
  CommandHandlerRegistrationObject,
} from '../../../plugin-types';
import { ImageCommandsBuilder, ImageOptions } from './image-commands-builder';
import { imagesController, IImageSettings } from './images-controller';

const imageCommands = new ImageCommandsBuilder();

export const addImageFactory: CommandHandlerInitializer = (input): CommandHandlerRegistrationObject => {
  const baseEl = input.settings.baseContainer as HTMLElement;

  return {
    addImage: (cmd: ICommand.AddImage) => {
      const settings: IImageSettings = {
        onClick: () => input.commandEngine.runCommands(cmd.onClick),
        url: cmd.url,
        id: cmd.id,
        layer: cmd.layer,
        transition: cmd.transition,
        r: cmd.r,
        x: cmd.x,
        y: cmd.y,
        w: cmd.w,
        h: cmd.h,
      };

      const image = imagesController.createImage(settings, baseEl);
      return Promise.resolve({});
    },
  };
};

export interface AddAddImage {
  addImage(instructions: ImageOptions);
}

export const addImage: AddAddImage['addImage'] = function(this: CommandBuilderContext, input: ImageOptions): void {
  const cmd = imageCommands.addImage(input);
  this.pushCommands(cmd);
};

export interface AddRemoveImage {
  removeImage(removeImageProps);
}

interface RemoveImageProps {
  id: string;
  transition?: number;
}

export const removeImage: AddRemoveImage['removeImage'] = function(
  this: CommandBuilderContext,
  input: RemoveImageProps,
): void {
  const cmd = imageCommands.removeImage(input);
  this.pushCommands(cmd);
};

export const removeImageFactory: CommandHandlerInitializer = (input): CommandHandlerRegistrationObject => {
  return {
    removeImage: (cmd: ICommand.RemoveImage) => {
      imagesController.removeImage(cmd.id, cmd.transition);
      return Promise.resolve({});
    },
  };
};

export const removeAllImagesFactory: CommandHandlerInitializer = (input): CommandHandlerRegistrationObject => {
  return {
    removeAllImages: (cmd: ICommand.RemoveAllImages) => {
      imagesController.removeAllImages(cmd.transition);
      return Promise.resolve({});
    },
  };
};

export interface AddRemoveAllImages {
  removeAllImages(transition?: number);
}

export const removeAllImages: AddRemoveAllImages['removeAllImages'] = function(
  this: CommandBuilderContext,
  input: number,
): void {
  const cmd = imageCommands.removeAllImages(input);
  this.pushCommands(cmd);
};
