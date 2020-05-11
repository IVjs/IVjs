import {
  audioSourceFactory,
  audioVolumeFactory,
  mute,
  muteFactory,
  AddMute,
  unmute,
  unmuteFactory,
  AddUnmute,
  bgAudio,
  setVolume,
  AddBgAudio,
  AddSetVolume,
} from './audio-commands';
import { PluginRegistration } from '../../../plugin-types';

export const audioPlugin: PluginRegistration = {
  nodeExtension: {
    bgAudio,
    setVolume,
    mute,
    unmute,
  },
  commandHandlerInitializers: [audioVolumeFactory, audioSourceFactory, muteFactory, unmuteFactory],
};

declare module '../../../node' {
  interface NodeExtensions extends AddBgAudio, AddSetVolume, AddMute, AddUnmute {}
}
