import { CommandHandlerInitializer } from '../../../plugin-types';
export declare const clearVideoFactory: CommandHandlerInitializer;
export interface AddClearVideo {
  clearVideo(time?: number): any;
}
export declare const clearVideo: AddClearVideo['clearVideo'];
