import {
  CommandBuilderContext,
  CommandHandlerInitializer,
  InitializerState,
  CommandHandlerRegistrationObject,
  CommandHandlerReturn,
} from '../../../plugin-types';
import { getRandomInt } from '../../../utils';

export interface RandNumInstructions {
  min: number;
  max: number;
  storeIn: string;
}

type CommandObjectForGetRandom = ICommand.GetRandomNumber;

export const getRandomNumberFactory: CommandHandlerInitializer = (input): CommandHandlerRegistrationObject => {
  return {
    getRandomNumber: (cmd: CommandObjectForGetRandom) => Promise.resolve(getRandomNumber(input, cmd)),
  };
};

export function getRandomNumber(given: InitializerState, cmd: CommandObjectForGetRandom): CommandHandlerReturn {
  given.variables[cmd.assignTo] = getRandomInt(cmd.min, cmd.max);
  return {};
}

export interface AddGetRandom {
  getRandom(instructions: RandNumInstructions);
}

export const getRandomNumberApi: AddGetRandom['getRandom'] = function(
  this: CommandBuilderContext,
  objSettings: RandNumInstructions,
) {
  const command: CommandObjectForGetRandom = {
    name: 'getRandomNumber',
    min: objSettings.min,
    max: objSettings.max,
    assignTo: objSettings.storeIn,
  };
  this.pushCommands(command);
};
