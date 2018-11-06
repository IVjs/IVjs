import { PluginRegistration } from '../../../base-iv';
import { IvNode } from '../../../node';
import { VideoCommandsBuilder } from './video-commands-builder';
import { videoController } from './video-controller';

export const clearVideoFactory: CommandEngine.TargetFunctionFactory = (input): Runner.TargetFunctionObject => {

  const baseEl = input.settings.baseContainer as HTMLElement;
  videoController.createPlayers(baseEl);

  return {
    'clearVideo': async (cmd: ICommand.PlayVideo) => {
      return Promise.resolve({});
    }
  }
}

const videoCommandBuilder = new VideoCommandsBuilder();

function clearVideo(this: IvNode, time?: number): void {
  this.pushCommands(...videoCommandBuilder.clearVideo(time));
}


export const clearVideoRegistration: PluginRegistration = {
  apiExtensions: [{
    apiName: 'clearVideo',
    apiFn: clearVideo,
  }],
  targetFunctionFactories: [clearVideoFactory],
}

declare module '../../../node' {
  interface NodeExtensions {
    clearVideo: typeof clearVideo
  }
}
