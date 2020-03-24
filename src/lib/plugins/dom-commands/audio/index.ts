import { audioSourceFactory, audioVolumeFactory, bgAudio, setVolume, AddBgAudio, AddSetVolume } from './audio-commands';
import { PluginRegistration } from '../../../plugin-types';

export const audioPlugin: PluginRegistration = {
  nodeExtension: {
    bgAudio,
    setVolume,
  },
  commandHandlerInitializers: [audioVolumeFactory, audioSourceFactory],
};

declare module '../../../node' {
  interface NodeExtensions extends AddBgAudio, AddSetVolume {}
}
