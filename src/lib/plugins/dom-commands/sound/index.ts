import { AddPlaySound, playSoundFactory, playSound, stopSoundFactory, AddStopSound, stopSound } from './play-sound';
import { PluginRegistration } from '../../../plugin-types';

export const soundPlugin: PluginRegistration = {
  nodeExtension: {
    playSound,
    stopSound,
  },
  commandHandlerInitializers: [playSoundFactory, stopSoundFactory],
};

declare module '../../../node' {
  interface NodeExtensions extends AddPlaySound, AddStopSound {}
}
