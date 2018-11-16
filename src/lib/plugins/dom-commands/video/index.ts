import { playVideo, playVideoFactory, AddPlayVideo } from './play-video'
import { clearVideo, clearVideoFactory, AddClearVideo } from './clear-video';
import { PluginRegistration } from '../../../base-iv';

export const videoPlugin: PluginRegistration = {
  apiExtension: {
    playVideo,
    clearVideo,
  },
  targetFunctionFactories: [
    playVideoFactory,
    clearVideoFactory
  ],
}

declare module '../../../node' {
  interface NodeExtensions extends AddClearVideo, AddPlayVideo {
  }
}
