import { AddBgAudio, AddSetVolume } from './audio-commands';
import { PluginRegistration } from '../../../plugin-types';
export declare const audioPlugin: PluginRegistration;
declare module '../../../node' {
  interface NodeExtensions extends AddBgAudio, AddSetVolume {}
}
