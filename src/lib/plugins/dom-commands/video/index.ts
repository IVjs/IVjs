import { playVideo, playVideoFactory, AddPlayVideo } from './play-video';
import { clearVideo, clearVideoFactory, AddClearVideo } from './clear-video';
import { PluginRegistration } from '../../../plugin-types';

export const videoPlugin: PluginRegistration = {
  nodeExtension: {
    playVideo,
    clearVideo,
  },
  commandHandlerInitializers: [playVideoFactory, clearVideoFactory],
};

declare module '../../../node' {
  interface NodeExtensions extends AddClearVideo, AddPlayVideo {}
}
