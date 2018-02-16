import { audioController } from './audio-controller';
import { CommandRunner } from '../../commandRunner';

export const audioSourceFactory: CommandEngine.TargetFunctionFactory = (input): Runner.TargetFunctionObject => {
  
  const baseEl = input.settings.baseContainer as HTMLElement;
  audioController.createPlayers(baseEl);

  return {'audioSource': (cmd: ICommand.AudioSource) => {
    switch (cmd.do) {
      case 'play':
        audioController.play(cmd.target, cmd.file);
        break;
      case 'load':
        audioController.load(cmd.target, cmd.file);
        break;
      case 'pause':
        audioController.pause(cmd.target)
        break;
      default:
        throw new Error(`unexpected command for audio source: "${cmd.do}"`);
    }


    
    const returnObj: Runner.CommandReturn = {};

    return Promise.resolve(returnObj);
  }}
}