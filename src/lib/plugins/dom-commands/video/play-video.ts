import { IvNode } from '../../../node';
import { PlayVideoInput, VideoCommandsBuilder } from './video-commands-builder';
import { urlsMatch } from '../../../utils';
import { videoController } from './video-controller';

export const playVideoFactory: CommandEngine.TargetFunctionFactory = (input): Runner.TargetFunctionObject => {

  const baseEl = input.settings.baseContainer as HTMLElement;
  videoController.createPlayers(baseEl);

  return {'playVideo': (cmd: ICommand.PlayVideo) => {
    const videoToPlay = `${input.settings.baseVideoUrl}${cmd.file}`;
    const onPlayerEnd = videoController.playVideo(videoToPlay);
    const returnObj: Runner.CommandReturn = {};

    if (cmd.onComplete) {
      const completing = new Promise((res, rej) => {
        onPlayerEnd.then(() => {
          if (urlsMatch(videoController.getCurrentPlayer().src, videoToPlay)) {
            res(cmd.onComplete);
          } else {
            rej('cancelled');
          }
        })
      }) as Promise<Runner.Command[]>

      returnObj.asyncCommands = completing;
    }
    return Promise.resolve(returnObj);
  }}
}

const videoCommandBuilder = new VideoCommandsBuilder();

export function playVideo(this: IvNode, ...input: PlayVideoInput[]) : void {
  this.pushCommands(...videoCommandBuilder.playVideo(...input));
}

export function videoPlay(this: IvNode, ...input: PlayVideoInput[]): void {
  console.warn('The `videoPlay` command is deprecated. Please Use `playVideo`')
  this.pushCommands(...videoCommandBuilder.playVideo(...input))
}