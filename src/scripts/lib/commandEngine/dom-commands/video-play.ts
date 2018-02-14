import { videoController } from './video-controller';

export const videoPlayFactory: CommandEngine.TargetFunctionFactory = (input): Runner.TargetFunctionObject => {
  
  const baseEl = input.settings.baseContainer as HTMLElement;
  videoController.createPlayers(baseEl);

  return {'playVideo': (cmd: ICommand.PlayVideo) => {
    videoController.playVideo(`${input.settings.baseVideoUrl}${cmd.file}`)
    return Promise.resolve({value: null});
  }}
}