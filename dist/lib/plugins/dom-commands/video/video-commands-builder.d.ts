interface VideoSettings {
  url: string;
  goToNode: string;
  runSync: string;
  runAsync: string;
  js: (...args: any[]) => any;
}
declare type VideoOptions = Partial<VideoSettings>;
export declare type PlayVideoInput = string | VideoOptions;
export declare class VideoCommandsBuilder {
  playVideo(...input: PlayVideoInput[]): ICommand.PlayVideo[];
  clearVideo(time?: number): Array<ICommand.Wait | ICommand.ClearVideo>;
  private handleDepricatedArrayInput;
  private handleArrayInput;
  private mergeMissingUrlsReducer;
  private reduceOnCompleteIntoPrevious;
  private guaranteedOptionsObject;
  private createPlayCommandFromOptions;
  private commandOptionsToCommands;
}
export {};
