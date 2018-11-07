import { playVideo, playVideoFactory, videoPlay } from './play-video'
import { clearVideo, clearVideoFactory } from './clear-video';
import { PluginRegistration } from '../../../base-iv';

export const videoPlugin: PluginRegistration = {
  apiExtensions: [{
    apiName: 'playVideo',
    apiFn: playVideo,
  }, {
    apiName: 'clearVideo',
    apiFn: clearVideo,
  }, {
    apiName: 'videoPlay', // Deprecated
    apiFn: videoPlay,
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
    videoPlay: typeof videoPlay
  }
}
