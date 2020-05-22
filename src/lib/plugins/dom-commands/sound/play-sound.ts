import {
  CommandBuilderContext,
  CommandHandlerInitializer,
  CommandHandlerRegistrationObject,
  CommandHandlerReturn,
} from '../../../plugin-types';
import { PlaySoundInput, SoundCommandsBuilder } from './sound-commands-builder';
import { urlsMatch } from '../../../utils';
import { soundController } from './sound-controller';

export const playSoundFactory: CommandHandlerInitializer = (input): CommandHandlerRegistrationObject => {
  return {
    playSound: (cmd: ICommand.PlaySound) => {
      const soundToPlay = `${input.settings.baseSoundUrl}${cmd.file}`;
      const onPlayerEnd = soundController.playSound(soundToPlay);
      const returnObj: CommandHandlerReturn = {};

      if (cmd.onComplete) {
        const completing = new Promise((res, rej) => {
          onPlayerEnd.then(() => {
            if (urlsMatch(soundController.players.current.src, soundToPlay)) {
              res(cmd.onComplete);
            } else {
              rej('cancelled');
            }
          });
        }) as Promise<Runner.Command[]>;

        returnObj.asyncCommands = completing;
      }
      return Promise.resolve(returnObj);
    },
  };
};

const soundCommandBuilder = new SoundCommandsBuilder();

export interface AddPlaySound {
  playSound(...urlOrInstructions: PlaySoundInput[]);
}

export const playSound: AddPlaySound['playSound'] = function(
  this: CommandBuilderContext,
  ...input: PlaySoundInput[]
): void {
  this.pushCommands(...soundCommandBuilder.playSound(...input));
};

export const stopSoundFactory: CommandHandlerInitializer = (input): CommandHandlerRegistrationObject => {
  return {
    stopSound: async (cmd: ICommand.StopSound) => {
      if (cmd.time) {
        setTimeout(() => {
          soundController.players.current.stop();
        }, cmd.time * 1000);
      } else {
        soundController.players.current.stop();
      }

      return Promise.resolve({});
    },
  };
};

export interface AddStopSound {
  stopSound(time?: number);
}

export const stopSound: AddStopSound['stopSound'] = function(this: CommandBuilderContext, time?: number): void {
  const command: ICommand.StopSound = {
    name: 'stopSound',
    time,
  };
  this.pushCommands(command);
};

export const sfxFactory: CommandHandlerInitializer = (input): CommandHandlerRegistrationObject => {
  return {
    sfx: async (cmd: ICommand.Sfx) => {
      input.settings.howls[cmd.id].play();
      return Promise.resolve({});
    },
  };
};

export interface AddSfx {
  sfx(id: string);
}

export const sfx: AddSfx['sfx'] = function(this: CommandBuilderContext, id: string): void {
  const command: ICommand.Sfx = {
    name: 'sfx',
    id,
  };
  this.pushCommands(command);
};
