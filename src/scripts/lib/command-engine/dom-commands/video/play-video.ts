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
          if (videoController.getCurrentPlayer().src === videoToPlay) {
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
