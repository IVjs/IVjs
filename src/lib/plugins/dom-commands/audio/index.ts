import { audioSourceFactory, audioVolumeFactory, bgAudio, setVolume, AddBgAudio, AddSetVolume } from './audio-commands';
import { PluginRegistration } from '../../../base-iv';

export const audioPlugin: PluginRegistration = {
  apiExtension: {
    bgAudio,
    setVolume,
  },
  targetFunctionFactories: [audioVolumeFactory, audioSourceFactory],
};

declare module '../../../node' {
  interface NodeExtensions extends AddBgAudio, AddSetVolume {}
}
