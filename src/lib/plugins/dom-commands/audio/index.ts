import { audioSourceFactory, audioVolumeFactory, bgAudio, setVolume } from './audio-commands';
import { PluginRegistration } from '../../../base-iv';

export const audioPlugin: PluginRegistration = {
  apiExtensions: [
    {
      apiName: 'bgAudio',
      apiFn: bgAudio,
    },
    {
      apiName: 'setVolume',
      apiFn: setVolume,
    }
  ],
  targetFunctionFactories: [
    audioVolumeFactory,
    audioSourceFactory,
  ],
}

declare module '../../../node' {
  interface NodeExtensions {
    bgAudio: typeof bgAudio;
    setVolume: typeof setVolume;
  }
}