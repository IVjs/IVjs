import {
  CommandBuilderContext,
  CommandHandlerInitializer,
  CommandHandlerRegistrationObject,
} from '../../../plugin-types';
import { VideoCommandsBuilder } from './video-commands-builder';
import { videoController } from './video-controller';

export const clearVideoFactory: CommandHandlerInitializer = (input): CommandHandlerRegistrationObject => {
  const baseEl = input.settings.baseContainer as HTMLElement;
  const convas: any = document.getElementById('IV-convas-renderer');
  videoController.createPlayers(baseEl);

  return {
    clearVideo: async (cmd: ICommand.ClearVideo) => {
      const ctx = convas.getContext('2d');
      videoController.getCurrentPlayer().pause();
      ctx.clearRect(0, 0, convas.width, convas.height);
      return Promise.resolve({});
    },
  };
};

const videoCommandBuilder = new VideoCommandsBuilder();

export interface AddClearVideo {
  clearVideo(time?: number);
}

export const clearVideo: AddClearVideo['clearVideo'] = function(this: CommandBuilderContext, time?: number): void {
  this.pushCommands(...videoCommandBuilder.clearVideo(time));
};
