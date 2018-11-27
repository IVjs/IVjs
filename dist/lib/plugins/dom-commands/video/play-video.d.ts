import { PlayVideoInput } from './video-commands-builder';
export declare const playVideoFactory: CommandEngine.TargetFunctionFactory;
export interface AddPlayVideo {
    playVideo(...urlOrInstructions: PlayVideoInput[]): any;
}
export declare const playVideo: AddPlayVideo['playVideo'];
