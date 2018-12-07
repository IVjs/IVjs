import { IvNode } from '../../../node';
import { VideoCommandsBuilder } from './video-commands-builder';
import { videoController } from './video-controller';

export const clearVideoFactory: CommandEngine.CommandHandlerInitializer = (input): Runner.TargetFunctionObject => {
  const baseEl = input.settings.baseContainer as HTMLElement;
  videoController.createPlayers(baseEl);

  return {
    clearVideo: async (cmd: ICommand.PlayVideo) => {
      return Promise.resolve({});
    },
  };
};

const videoCommandBuilder = new VideoCommandsBuilder();

export interface AddClearVideo {
  clearVideo(time?: number);
}

export const clearVideo: AddClearVideo['clearVideo'] = function(this: IvNode, time?: number): void {
  this.pushCommands(...videoCommandBuilder.clearVideo(time));
};
