import { CommandHandlerInitializer } from '../../../plugin-types';
import { PlayVideoInput } from './video-commands-builder';
export declare const playVideoFactory: CommandHandlerInitializer;
export interface AddPlayVideo {
  playVideo(...urlOrInstructions: PlayVideoInput[]): any;
}
export declare const playVideo: AddPlayVideo['playVideo'];
