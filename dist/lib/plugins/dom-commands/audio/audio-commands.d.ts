import { CommandHandlerInitializer } from '../../../plugin-types';
interface AudioAction {
  action: 'play' | 'pause' | 'load';
  url?: string;
  loop?: boolean;
}
interface AudioShorthand {
  play?: string;
  load?: string;
  loop?: boolean;
}
declare type AudioInput = 'play' | 'pause' | 'loop' | AudioShorthand | AudioAction;
export declare const audioSourceFactory: CommandHandlerInitializer;
export interface AddBgAudio {
  bgAudio(input: AudioInput): any;
}
export declare const bgAudio: AddBgAudio['bgAudio'];
export declare const audioVolumeFactory: CommandHandlerInitializer;
export interface AddSetVolume {
  setVolume(input: { target: 'bg' | 'sfx'; volume: number; time?: number }): any;
}
export declare const setVolume: AddSetVolume['setVolume'];
export {};
