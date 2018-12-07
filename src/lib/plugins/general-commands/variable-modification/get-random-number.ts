import { CommandBuilderContext, CommandHandlerInitializer } from '../../../plugin-types';
import { getRandomInt } from '../../../utils';

export interface RandNumInstructions {
  min: number;
  max: number;
  storeIn: string;
}

export const getRandomNumberFactory: CommandHandlerInitializer = (input): Runner.CommandHandlerRegistrationObject => {
  return {
    getRandomNumber: (cmd: ICommand.GetRandomNumber) => Promise.resolve(getRandomNumber(input, cmd)),
  };
};

export function getRandomNumber(
  given: CommandEngine.TargetFunctionFactoryInput,
  cmd: ICommand.GetRandomNumber,
): Runner.CommandReturn {
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
  const command: ICommand.GetRandomNumber = {
    name: 'getRandomNumber',
    min: objSettings.min,
    max: objSettings.max,
    assignTo: objSettings.storeIn,
  };
  this.pushCommands(command);
};
