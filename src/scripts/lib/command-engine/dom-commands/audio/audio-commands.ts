import { audioController } from './audio-controller';

export const audioSourceFactory: CommandEngine.TargetFunctionFactory = (input): Runner.TargetFunctionObject => {
  
  const baseEl = input.settings.baseContainer as HTMLElement;
  audioController.createPlayers(baseEl);

  if (input.settings.bgAudioUrl) {
    audioController.load('BG', input.settings.bgAudioUrl)
  }

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

export const audioVolumeFactory: CommandEngine.TargetFunctionFactory = (input): Runner.TargetFunctionObject => {

  const baseEl = input.settings.baseContainer as HTMLElement;
  audioController.createPlayers(baseEl);

  return {
    'audioVolume': (cmd: ICommand.AudioVolume) => {
      const returnObj: Runner.CommandReturn = {};

      if (cmd.time) {
        audioController.volume(cmd.target, cmd.volume, cmd.time)
      } else {
        audioController.volume(cmd.target, cmd.volume)
      }

      return Promise.resolve(returnObj);
    }
  }
}