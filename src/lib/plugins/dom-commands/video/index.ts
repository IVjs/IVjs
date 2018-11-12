import { playVideo, playVideoFactory } from './play-video'
import { clearVideo, clearVideoFactory } from './clear-video';
import { PluginRegistration } from '../../../base-iv';

export const videoPlugin: PluginRegistration = {
  apiExtensions: [{
    apiName: 'playVideo',
    apiFn: playVideo,
  }, {
    apiName: 'clearVideo',
    apiFn: clearVideo,
  }],
  targetFunctionFactories: [
    playVideoFactory,
    clearVideoFactory
  ],
}

declare module '../../../node' {
  interface NodeExtensions {
    clearVideo: typeof clearVideo
    playVideo: typeof playVideo
  }
}
