import { IvNode } from '../../../node';
import { audioController } from './audio-controller';

interface AudioAction {
  action: 'play' | 'pause' | 'load';
  url?: string;
  loop?: boolean;
}

interface AudioShorthand {
  play?: string;
  load?: string;
  loop?: boolean;
}

type AudioInput = 'play' | 'pause' | 'loop' | AudioShorthand | AudioAction;

export const audioSourceFactory: CommandEngine.TargetFunctionFactory = (input): Runner.TargetFunctionObject => {

  const baseEl = input.settings.baseContainer as HTMLElement;
  audioController.createPlayers(baseEl);

  if (input.settings.bgAudioUrl) {
    audioController.load('BG', input.settings.bgAudioUrl)
  }
  audioController.loop('BG', input.settings.bgAudioLoop)

  return {'audioSource': (cmd: ICommand.AudioSource) => {
    const {target, file, loop} = cmd;
    switch (cmd.do) {
      case 'play':
        audioController.play(target, file);
        break;
      case 'load':
        audioController.load(target, file);
        break;
      case 'pause':
        audioController.pause(target)
        break;
      default:
        throw new Error(`unexpected command for audio source: "${cmd.do}"`);
    }

    if (loop !== undefined) {
      audioController.loop(target, loop);
    }

    const returnObj: Runner.CommandReturn = {};

    return Promise.resolve(returnObj);
  }}
}

export interface AddBgAudio {
  bgAudio(input: AudioInput);
}

export const bgAudio: AddBgAudio['bgAudio'] = function(this: IvNode, input: AudioInput) {
  this.pushCommands(bgAudioCommand(input));
}

function bgAudioCommand(input: AudioInput): ICommand.AudioSource {
  if (typeof input === 'string') {
    return {
      name: 'audioSource',
      target: 'BG',
      do: input === 'loop' ? null : input,
      loop: input === 'loop' ? true : undefined,
    }
  } else {
    if ((input as AudioAction).action) {
      return {
        name: 'audioSource',
        target: 'BG',
        do: (input as AudioAction).action,
        file: (input as AudioAction).url,
        loop: (input as AudioAction).loop,
      }
    } else {
      const { play, load, loop } = input as AudioShorthand;
      if (play) {
        return {
          name: 'audioSource',
          target: 'BG',
          do: 'play',
          file: play,
          loop
        }
      } else if (load) {
        return {
          name: 'audioSource',
          target: 'BG',
          do: 'load',
          file: load,
          loop
        }
      } else {
        return {
          name: 'audioSource',
          target: 'BG',
          do: null,
          file: load,
          loop
        }
      }
    }
  }
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

export interface AddSetVolume {
  setVolume(input: { target: 'bg' | 'sfx', volume: number, time?: number });
}

export const setVolume: AddSetVolume['setVolume'] = function(this: IvNode, input: { target: 'bg' | 'sfx', volume: number, time?: number }) {
  const { volume, target, time } = input;
  const command: ICommand.AudioVolume = {
    name: 'audioVolume',
    target: target.toUpperCase() as 'BG' | 'SFX',
    volume,
    time: time ? time * 1000 : time,
  }
  this.pushCommands(command);
}
