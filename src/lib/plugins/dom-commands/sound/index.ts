import {
  AddSfx,
  sfxFactory,
  sfx,
  AddPlaySound,
  playSoundFactory,
  playSound,
  stopSoundFactory,
  AddStopSound,
  stopSound,
} from './play-sound';
import { PluginRegistration } from '../../../plugin-types';

export const soundPlugin: PluginRegistration = {
  nodeExtension: {
    playSound,
    stopSound,
    sfx,
  },
  commandHandlerInitializers: [playSoundFactory, stopSoundFactory, sfxFactory],
};

declare module '../../../node' {
  interface NodeExtensions extends AddPlaySound, AddStopSound, AddSfx {}
}
