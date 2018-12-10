import { AddPlayVideo } from './play-video';
import { AddClearVideo } from './clear-video';
import { PluginRegistration } from '../../../plugin-types';
export declare const videoPlugin: PluginRegistration;
declare module '../../../node' {
  interface NodeExtensions extends AddClearVideo, AddPlayVideo {}
}
