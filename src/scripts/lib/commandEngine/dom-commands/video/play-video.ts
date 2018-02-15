import { videoController } from './video-controller';
import { CommandRunner } from '../../commandRunner';

export const videoPlayFactory: CommandEngine.TargetFunctionFactory = (input): Runner.TargetFunctionObject => {
  
  const baseEl = input.settings.baseContainer as HTMLElement;
  videoController.createPlayers(baseEl);

  return {'playVideo': (cmd: ICommand.PlayVideo) => {
    const ending = videoController.playVideo(`${input.settings.baseVideoUrl}${cmd.file}`);
    
    const returnObj: Runner.CommandReturn = {};

    if (cmd.onComplete) {
      const completing = new Promise(res => {
        ending.then(() => res(cmd.onComplete))
      }) as Promise<Runner.Command[]>

      returnObj.asyncCommands = completing;
    }
    return Promise.resolve(returnObj);
  }}
}