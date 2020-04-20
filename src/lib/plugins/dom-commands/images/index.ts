import { PluginRegistration } from '../../../plugin-types';
import {
  addImage,
  removeImage,
  removeAllImages,
  addImageFactory,
  removeAllImagesFactory,
  removeImageFactory,
  AddRemoveAllImages,
  AddAddImage,
  AddRemoveImage,
} from './images-commands';

export const imagePlugin: PluginRegistration = {
  nodeExtension: {
    addImage,
    removeImage,
    removeAllImages,
  },
  commandHandlerInitializers: [addImageFactory, removeAllImagesFactory, removeImageFactory],
};

declare module '../../../node' {
  interface NodeExtensions extends AddRemoveAllImages, AddRemoveImage, AddAddImage {}
}
