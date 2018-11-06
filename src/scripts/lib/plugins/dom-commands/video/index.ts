import { playVideo, playVideoFactory, videoPlay } from './play-video'
import { PluginRegistration } from '../../../base-iv';

export const playVideoRegistration: PluginRegistration = {
  apiExtensions: [{
    apiName: 'playVideo',
    apiFn: playVideo,
  }],
  targetFunctionFactories: [playVideoFactory],
}

export const deprecatedVideoPlayRegistration: PluginRegistration = {
  apiExtensions: [{
    apiName: 'videoPlay',
    apiFn: videoPlay,
  }],
}

declare module '../../../node' {
  interface NodeExtensions {
    playVideo: typeof playVideo
    videoPlay: typeof videoPlay
  }
}
